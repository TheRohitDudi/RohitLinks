"use client";

import { useState } from "react";
import type { PersonalLink } from "@/types";
import { ICON_MAP } from "./link-icons";
import { EyeOff, MoreVertical } from "lucide-react";
import { ShareModal, formatUrlPreview } from "./share-modal";

interface LinksDisplayProps {
    links: PersonalLink[];
    isAdmin?: boolean;
    onEdit?: (link: PersonalLink) => void;
    onDelete?: (id: string) => void;
    onToggleVisibility?: (id: string) => void;
}

function LinkPill({
    link,
    index,
    isAdmin,
    onEdit,
    onDelete,
    onToggleVisibility,
}: {
    link: PersonalLink;
    index: number;
    isAdmin: boolean;
    onEdit?: (link: PersonalLink) => void;
    onDelete?: (id: string) => void;
    onToggleVisibility?: (id: string) => void;
}) {
    const [shareOpen, setShareOpen] = useState(false);

    return (
        <>
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-link group relative flex items-center gap-3 rounded-full pl-2 pr-2 py-2 sm:py-2.5 hover-glow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background cursor-pointer animate-slide-up"
                style={{ animationDelay: `${Math.min(index, 24) * 35}ms` }}
                aria-label={`${link.title} - Opens in new window`}
            >
                {/* Icon */}
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center text-white transition-colors">
                    {ICON_MAP[link.icon] || ICON_MAP.globe}
                </span>

                {/* Title */}
                <span className="flex-1 min-w-0 px-1 text-center">
                    <span className="font-semibold text-sm sm:text-base text-white block truncate">
                        {link.title}
                    </span>
                    {link.description && (
                        <span className="text-[11px] sm:text-xs text-white/55 truncate block mt-0.5">
                            {link.description}
                        </span>
                    )}
                    {isAdmin && (
                        <span className="text-[11px] text-white/55 truncate block mt-0.5">
                            {link.url}
                        </span>
                    )}
                </span>

                {/* Actions */}
                {isAdmin ? (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onToggleVisibility?.(link.id);
                            }}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            title={link.visible ? "Hide" : "Show"}
                            aria-label={link.visible ? "Hide link" : "Show link"}
                        >
                            {!link.visible && (
                                <EyeOff className="w-4 h-4 text-white/60" />
                            )}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onEdit?.(link);
                            }}
                            className="px-3 py-1.5 text-xs bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete?.(link.id);
                            }}
                            className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShareOpen(true);
                        }}
                        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Share link"
                        title="Share link"
                    >
                        <MoreVertical className="w-4 h-4" aria-hidden="true" />
                    </button>
                )}
            </a>

            {!isAdmin && (
                <ShareModal
                    open={shareOpen}
                    onOpenChange={setShareOpen}
                    title="Share link"
                    url={link.url}
                    enableLiveFetch
                    preview={{
                        image: "/header_profile.png",
                        heading: link.title,
                        domain: formatUrlPreview(link.url),
                        description: link.description,
                    }}
                />
            )}
        </>
    );
}

export function LinksDisplay({
    links,
    isAdmin = false,
    onEdit,
    onDelete,
    onToggleVisibility,
}: LinksDisplayProps) {
    const visibleLinks = links
        .filter((link) => link.visible)
        .sort((a, b) => a.order - b.order);

    return (
        <div
            className="w-full max-w-xl mx-auto px-4 relative z-10"
            role="region"
            aria-label="Personal links"
        >
            {visibleLinks.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                    <p>No links available yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {visibleLinks.map((link, index) => (
                        <LinkPill
                            key={link.id}
                            link={link}
                            index={index}
                            isAdmin={isAdmin}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleVisibility={onToggleVisibility}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
