"use client";

import type { PersonalLink } from "@/types";
import { ICON_MAP } from "./link-icons";
import { ExternalLink, EyeOff } from "lucide-react";

interface LinksDisplayProps {
    links: PersonalLink[];
    isAdmin?: boolean;
    onEdit?: (link: PersonalLink) => void;
    onDelete?: (id: string) => void;
    onToggleVisibility?: (id: string) => void;
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
            <div className="space-y-3">
                {visibleLinks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No links available yet.</p>
                    </div>
                ) : (
                    visibleLinks.map((link, index) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background cursor-pointer animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                            aria-label={`${link.title} - Opens in new window`}
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <span className="text-primary">
                                    {ICON_MAP[link.icon] || ICON_MAP.globe}
                                </span>
                            </div>

                            {/* Title */}
                            <div className="flex-1 min-w-0">
                                <span className="font-semibold text-base text-foreground group-hover:text-primary transition-colors block truncate">
                                    {link.title}
                                </span>
                                {isAdmin && (
                                    <span className="text-xs text-muted-foreground truncate block mt-0.5">
                                        {link.url}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            {isAdmin ? (
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onToggleVisibility?.(link.id);
                                        }}
                                        className="p-2 hover:bg-muted rounded transition-colors"
                                        title={link.visible ? "Hide" : "Show"}
                                        aria-label={
                                            link.visible
                                                ? "Hide link"
                                                : "Show link"
                                        }
                                    >
                                        {!link.visible && (
                                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                                        )}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onEdit?.(link);
                                        }}
                                        className="px-3 py-1.5 text-xs bg-primary/20 text-primary hover:bg-primary/30 rounded transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onDelete?.(link.id);
                                        }}
                                        className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <ExternalLink
                                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                                    aria-hidden="true"
                                />
                            )}
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}
