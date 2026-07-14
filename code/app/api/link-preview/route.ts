import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface PreviewData {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
}

const cache = new Map<string, { data: PreviewData; expires: number }>();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
// Results with nothing useful in them are cached only briefly, so a
// transient scraping miss doesn't get "stuck" and keep blocking retries.
const EMPTY_CACHE_TTL_MS = 2 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;
const MAX_HTML_BYTES = 2_000_000;

function isEmptyPreview(data: PreviewData): boolean {
    return !data.title && !data.description && !data.image;
}

function decodeHtmlEntities(str: string): string {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&nbsp;/g, " ")
        .trim();
}

function extractMeta(html: string, keys: string[]): string | undefined {
    for (const key of keys) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const patterns = [
            new RegExp(
                `<meta[^>]+(?:property|name)=["']${escapedKey}["'][^>]*content=["']([^"']*)["']`,
                "i",
            ),
            new RegExp(
                `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${escapedKey}["']`,
                "i",
            ),
        ];
        for (const re of patterns) {
            const match = html.match(re);
            if (match?.[1]) return decodeHtmlEntities(match[1]);
        }
    }
    return undefined;
}

async function fetchSpotifyPreview(parsed: URL): Promise<PreviewData | null> {
    try {
        const res = await fetch(
            `https://open.spotify.com/oembed?url=${encodeURIComponent(parsed.toString())}`,
            { headers: { Accept: "application/json" } },
        );
        if (!res.ok) return null;
        const data = await res.json();
        return {
            title: data.title,
            image: data.thumbnail_url,
            siteName: "Spotify",
        };
    } catch {
        return null;
    }
}

async function fetchDiscordInvitePreview(parsed: URL): Promise<PreviewData | null> {
    const code = parsed.pathname.replace(/\/(invite\/)?/, "").split("/")[0];
    if (!code) return null;
    try {
        const res = await fetch(
            `https://discord.com/api/v10/invites/${code}?with_counts=true`,
            { headers: { Accept: "application/json" } },
        );
        if (!res.ok) return null;
        const data = await res.json();
        const guild = data.guild;
        if (!guild) return null;
        return {
            title: guild.name,
            description: guild.description || undefined,
            image: guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
                : undefined,
            siteName: "Discord",
        };
    } catch {
        return null;
    }
}

/** A handful of platforms render previews client-side via JS, so their raw
 * HTML has no useful Open Graph tags. These use each platform's own public
 * embed/API endpoints instead of scraping. */
async function fetchSpecialCasePreview(parsed: URL): Promise<PreviewData | null> {
    if (parsed.hostname.includes("open.spotify.com")) {
        return fetchSpotifyPreview(parsed);
    }
    if (
        parsed.hostname === "discord.gg" ||
        (parsed.hostname === "discord.com" && parsed.pathname.startsWith("/invite/"))
    ) {
        return fetchDiscordInvitePreview(parsed);
    }
    return null;
}

export async function GET(request: NextRequest) {
    const targetUrl = request.nextUrl.searchParams.get("url");
    if (!targetUrl) {
        return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    let parsed: URL;
    try {
        parsed = new URL(targetUrl);
        if (!/^https?:$/.test(parsed.protocol)) {
            throw new Error("Unsupported protocol");
        }
    } catch {
        return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }

    const cacheKey = parsed.toString();
    const cached = cache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
        return NextResponse.json(cached.data, {
            headers: { "Cache-Control": "public, max-age=3600" },
        });
    }

    const special = await fetchSpecialCasePreview(parsed);
    if (special) {
        cache.set(cacheKey, { data: special, expires: Date.now() + CACHE_TTL_MS });
        return NextResponse.json(special, {
            headers: { "Cache-Control": "public, max-age=3600" },
        });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const res = await fetch(parsed.toString(), {
            signal: controller.signal,
            redirect: "follow",
            // Deliberately not using Next's `next.revalidate` fetch cache here —
            // we want every request to hit the network fresh and rely solely on
            // our own explicit, inspectable cache below.
            cache: "no-store",
            headers: {
                // Many sites (YouTube, Instagram, etc.) only serve full HTML with
                // Open Graph tags to requests that look like a real browser.
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });

        const contentType = res.headers.get("content-type") || "";
        if (!res.ok || !contentType.includes("text/html")) {
            throw new Error(`Unusable upstream response (${res.status})`);
        }

        const rawHtml = await res.text();
        const html = rawHtml.slice(0, MAX_HTML_BYTES);

        const data: PreviewData = {
            title:
                extractMeta(html, ["og:title", "twitter:title"]) ||
                html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim(),
            description: extractMeta(html, [
                "og:description",
                "twitter:description",
                "description",
            ]),
            image: extractMeta(html, [
                "og:image:secure_url",
                "og:image",
                "twitter:image",
            ]),
            siteName: extractMeta(html, ["og:site_name"]),
        };

        if (data.image) {
            try {
                data.image = new URL(data.image, parsed).toString();
            } catch {
                data.image = undefined;
            }
        }

        const ttl = isEmptyPreview(data) ? EMPTY_CACHE_TTL_MS : CACHE_TTL_MS;
        cache.set(cacheKey, { data, expires: Date.now() + ttl });

        return NextResponse.json(data, {
            headers: {
                "Cache-Control": isEmptyPreview(data)
                    ? "no-store"
                    : "public, max-age=3600",
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch preview" },
            { status: 502 },
        );
    } finally {
        clearTimeout(timeout);
    }
}
