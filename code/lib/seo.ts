import type { Metadata, Viewport } from "next";
import { DEFAULT_LINKS, FOOTER_SITES, CONTACT_EMAIL } from "./constants";

export const SITE_BASE_URL = "https://links.rohitdudi.com";

const SITE_TITLE = "Rohit Dudi (@TheRohitDudi) - All My Links";
const SITE_DESCRIPTION =
    "Connect with Rohit Dudi — Climate Activist, Data Scientist & YouTuber. All my links: YouTube, Instagram, X, LinkedIn, GitHub & 30+ more.";

export function generateMetadata(overrides?: Partial<Metadata>): Metadata {
    const baseUrl = SITE_BASE_URL;

    const title = SITE_TITLE;
    const description = SITE_DESCRIPTION;

    return {
        title,
        description,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: baseUrl,
        },
        openGraph: {
            title,
            description,
            url: baseUrl,
            siteName: "Rohit Dudi Links",
            type: "website",
            images: [
                {
                    url: `${baseUrl}/header_profile.jpg`,
                    width: 1200,
                    height: 1200,
                    alt: "Rohit Dudi - All My Links",
                    type: "image/jpeg",
                },
            ],
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${baseUrl}/header_profile.jpg`],
            creator: "@TheRohitDudi",
            site: "@TheRohitDudi",
        },
        robots: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        keywords: [
            "Rohit Dudi",
            "TheRohitDudi",
            "RealRohitDudi",
            "Rohit",
            "Dudi",
            "link in bio",
            "linktree",
            "personal links",
            "social media links",
            "link aggregator",
            "Climate Activist",
            "Data Scientist",
            "YouTuber",
            ...DEFAULT_LINKS.map((link) => link.title),
        ],
        authors: [
            {
                name: "Rohit Dudi",
                url: "https://rohitdudi.com",
            },
        ],
        creator: "Rohit Dudi",
        publisher: "Rohit Dudi",
        category: "Personal",
        ...overrides,
    };
}

export function generateViewport(): Viewport {
    return {
        width: "device-width",
        initialScale: 1,
        maximumScale: 5,
        themeColor: "#00d9ff",
    };
}

export function generateJSONLD() {
    const baseUrl = SITE_BASE_URL;

    const sameAs = [
        "https://rohitdudi.com",
        ...FOOTER_SITES.filter((site) => site.href !== "https://rohitdudi.com").map(
            (site) => site.href,
        ),
        ...DEFAULT_LINKS.map((link) => link.url),
    ];

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${baseUrl}/#person`,
                name: "Rohit Dudi",
                alternateName: ["TheRohitDudi", "RohitDudi"],
                url: "https://rohitdudi.com",
                image: `${baseUrl}/header_profile.jpg`,
                sameAs,
                email: `mailto:${CONTACT_EMAIL}`,
                jobTitle: "Data Scientist, Full-Stack Engineer & Content Creator",
                description:
                    "Climate Activist, Data Scientist and YouTuber. Connect with Rohit Dudi across all platforms.",
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                url: baseUrl,
                name: "Rohit Dudi - All My Links",
                description: SITE_DESCRIPTION,
                publisher: {
                    "@id": `${baseUrl}/#person`,
                },
                potentialAction: {
                    "@type": "SearchAction",
                    target: `${baseUrl}?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: baseUrl,
                    },
                ],
            },
        ],
    };
}

export function validateSEO(metadata: Metadata): {
    valid: boolean;
    issues: string[];
} {
    const issues: string[] = [];

    if (
        !metadata.title ||
        (typeof metadata.title === "string" && metadata.title.length < 10) ||
        (Array.isArray(metadata.title) && metadata.title.join(" ").length < 10)
    ) {
        issues.push("Title should be at least 10 characters");
    }

    if (!metadata.description || metadata.description.length < 50) {
        issues.push("Description should be at least 50 characters");
    }

    if (metadata.description && metadata.description.length > 160) {
        issues.push("Description should be less than 160 characters");
    }

    if (
        !metadata.keywords ||
        (Array.isArray(metadata.keywords) && metadata.keywords.length < 3)
    ) {
        issues.push("Should have at least 3 keywords");
    }

    return {
        valid: issues.length === 0,
        issues,
    };
}
