"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Link2,
    Check,
    Mail,
    MoreHorizontal,
    Linkedin as LinkedinIcon,
    X as CloseIcon,
    BadgeCheck,
} from "lucide-react";
import { SiX, SiFacebook, SiWhatsapp, SiTelegram } from "react-icons/si";

export interface SharePreview {
    image?: string;
    icon?: React.ReactNode;
    verified?: boolean;
    heading: string;
    domain?: string;
    description?: string;
}

interface LivePreviewData {
    title?: string;
    description?: string;
    image?: string;
}

const livePreviewCache = new Map<string, LivePreviewData>();

interface ShareModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    url: string;
    preview: SharePreview;
    /** When true, fetches a real website preview (og:title/description/image) for `url`. */
    enableLiveFetch?: boolean;
}

export function formatUrlPreview(rawUrl: string, maxLength = 30): string {
    try {
        const parsed = new URL(rawUrl);
        const compact = `${parsed.host}${parsed.pathname}${parsed.search}`.replace(
            /\/$/,
            "",
        );
        return compact.length > maxLength
            ? `${compact.slice(0, maxLength)}…`
            : compact;
    } catch {
        return rawUrl;
    }
}

export function ShareModal({
    open,
    onOpenChange,
    title,
    url,
    preview,
    enableLiveFetch = false,
}: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const [canNativeShare, setCanNativeShare] = useState(false);
    const [live, setLive] = useState<LivePreviewData | null>(
        () => livePreviewCache.get(url) ?? null,
    );
    const [loadingPreview, setLoadingPreview] = useState(false);
    // Tracks every src that has failed to load (not just the last one), so
    // if the live image fails (e.g. blocked by the source site's hotlink
    // protection) we correctly fall through to the local avatar instead of
    // showing nothing.
    const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

    useEffect(() => {
        setCanNativeShare(
            typeof navigator !== "undefined" && typeof navigator.share === "function",
        );
    }, []);

    useEffect(() => {
        // Give images a fresh chance to load every time the modal opens —
        // a prior transient load failure shouldn't stick around forever.
        if (open) setFailedSrcs(new Set());
    }, [open]);

    useEffect(() => {
        if (!open || !enableLiveFetch) return;

        const cached = livePreviewCache.get(url);
        if (cached) {
            setLive(cached);
            return;
        }

        let cancelled = false;
        setLoadingPreview(true);

        fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data: LivePreviewData | null) => {
                if (cancelled || !data) return;
                // Don't lock in an empty result for the rest of the session —
                // let a later reopen try fetching fresh again.
                if (data.title || data.description || data.image) {
                    livePreviewCache.set(url, data);
                }
                setLive(data);
            })
            .catch(() => {
                // Live preview unavailable — the static fallback preview stays visible.
            })
            .finally(() => {
                if (!cancelled) setLoadingPreview(false);
            });

        return () => {
            cancelled = true;
        };
    }, [open, url, enableLiveFetch]);

    // Try the live image first, then fall back to the local avatar if the
    // live one is missing or failed to actually render.
    const displayImage = [live?.image, preview.image].find(
        (src): src is string => Boolean(src) && !failedSrcs.has(src as string),
    );
    const isLiveImage = displayImage === live?.image;
    const displayHeading = live?.title || preview.heading;
    const displayDescription = live?.description || preview.description;

    const shareText = preview.heading;

    const openWindow = (target: string) => {
        window.open(target, "_blank", "noopener,noreferrer,width=600,height=650");
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Clipboard unavailable — nothing more we can do silently.
        }
    };

    const handleNativeShare = async () => {
        try {
            await navigator.share({ title: shareText, url });
        } catch {
            // User cancelled — nothing to do.
        }
    };

    const targets: {
        id: string;
        label: string;
        onClick: () => void;
        icon: React.ReactNode;
        bg: string;
    }[] = [
        {
            id: "copy",
            label: copied ? "Copied!" : "Copy link",
            onClick: handleCopy,
            icon: copied ? (
                <Check className="w-5 h-5 text-emerald-600" />
            ) : (
                <Link2 className="w-5 h-5" />
            ),
            bg: "bg-neutral-100 text-neutral-900",
        },
        {
            id: "x",
            label: "X",
            onClick: () =>
                openWindow(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
                ),
            icon: <SiX className="w-5 h-5" />,
            bg: "bg-black text-white",
        },
        {
            id: "facebook",
            label: "Facebook",
            onClick: () =>
                openWindow(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                ),
            icon: <SiFacebook className="w-5 h-5" />,
            bg: "bg-[#1877F2] text-white",
        },
        {
            id: "whatsapp",
            label: "WhatsApp",
            onClick: () =>
                openWindow(
                    `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`,
                ),
            icon: <SiWhatsapp className="w-5 h-5" />,
            bg: "bg-[#25D366] text-white",
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            onClick: () =>
                openWindow(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                ),
            icon: <LinkedinIcon className="w-5 h-5" />,
            bg: "bg-[#0A66C2] text-white",
        },
        {
            id: "telegram",
            label: "Telegram",
            onClick: () =>
                openWindow(
                    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
                ),
            icon: <SiTelegram className="w-5 h-5" />,
            bg: "bg-[#26A5E4] text-white",
        },
        {
            id: "email",
            label: "Email",
            onClick: () => {
                window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(url)}`;
            },
            icon: <Mail className="w-5 h-5" />,
            bg: "bg-neutral-500 text-white",
        },
    ];

    if (canNativeShare) {
        targets.push({
            id: "more",
            label: "More",
            onClick: handleNativeShare,
            icon: <MoreHorizontal className="w-5 h-5" />,
            bg: "bg-neutral-100 text-neutral-900",
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="bg-white text-neutral-900 border-none rounded-2xl p-5 sm:p-6 max-w-sm gap-4"
            >
                <DialogDescription className="sr-only">
                    Share &ldquo;{preview.heading}&rdquo; via link or social apps.
                </DialogDescription>
                <div className="flex items-center justify-between">
                    <DialogTitle className="text-base font-semibold text-neutral-900">
                        {title}
                    </DialogTitle>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="p-1 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500"
                        aria-label="Close"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Preview card */}
                <div
                    className="rounded-2xl px-6 py-7 text-center"
                    style={{ backgroundColor: "#3a2a1e" }}
                >
                    <div className="relative w-20 h-20 mx-auto">
                        {displayImage ? (
                            <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white/15 bg-white/10">
                                {isLiveImage ? (
                                    // Live-fetched preview images can come from any external
                                    // domain, so a plain <img> is used instead of next/image.
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={displayImage}
                                        alt=""
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                        onError={() =>
                                            setFailedSrcs((prev) => new Set(prev).add(displayImage))
                                        }
                                    />
                                ) : (
                                    <Image
                                        src={displayImage}
                                        alt=""
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                        onError={() =>
                                            setFailedSrcs((prev) => new Set(prev).add(displayImage))
                                        }
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-2xl bg-white/10 flex items-center justify-center text-white [&>svg]:w-9 [&>svg]:h-9">
                                {loadingPreview ? (
                                    <span className="w-9 h-9 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
                                ) : (
                                    preview.icon
                                )}
                            </div>
                        )}
                        {preview.verified && (
                            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#00d9ff] flex items-center justify-center ring-2 ring-[#3a2a1e]">
                                <BadgeCheck
                                    className="w-3.5 h-3.5 text-black"
                                    strokeWidth={2.5}
                                />
                            </div>
                        )}
                    </div>

                    <h3 className="mt-4 text-white font-bold text-lg leading-snug">
                        {displayHeading}
                    </h3>
                    {preview.domain && (
                        <p className="text-white/55 text-sm mt-1">{preview.domain}</p>
                    )}
                    {displayDescription ? (
                        <p className="text-white/70 text-sm mt-3 line-clamp-3 leading-relaxed">
                            {displayDescription}
                        </p>
                    ) : (
                        loadingPreview && (
                            <div className="mt-3 space-y-1.5 flex flex-col items-center">
                                <span className="h-2.5 w-40 rounded-full bg-white/10 animate-pulse" />
                                <span className="h-2.5 w-28 rounded-full bg-white/10 animate-pulse" />
                            </div>
                        )
                    )}
                </div>

                {/* Share targets */}
                <div className="flex gap-4 overflow-x-auto pb-1 -mx-1 px-1">
                    {targets.map((target) => (
                        <button
                            key={target.id}
                            onClick={target.onClick}
                            className="flex flex-col items-center gap-2 flex-shrink-0 w-16 group"
                        >
                            <span
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 ${target.bg}`}
                            >
                                {target.icon}
                            </span>
                            <span className="text-[11px] text-neutral-600 truncate w-full text-center">
                                {target.label}
                            </span>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
