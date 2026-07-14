"use client";

import type { PersonalLink } from "@/types";
import { ICON_MAP } from "./link-icons";
import { ExternalLink, EyeOff } from "lucide-react";

interface LinksDisplayProps {
    links: PersonalLink[];
    isAdmin?: boolean;
    groupByCategory?: boolean;
    onEdit?: (link: PersonalLink) => void;
    onDelete?: (id: string) => void;
    onToggleVisibility?: (id: string) => void;
}

function LinkCard({
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
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 p-4 glass-card rounded-xl hover:border-primary/50 hover-glow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 40}ms` }}
            aria-label={`${link.title} - Opens in new window`}
        >
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                <span className="text-primary">
                    {ICON_MAP[link.icon] || ICON_MAP.globe}
                </span>
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
                <span className="font-semibold text-base text-foreground group-hover:text-primary transition-colors block truncate">
                    {link.title}
                </span>
                {link.description && !isAdmin && (
                    <span className="text-xs text-muted-foreground truncate block mt-0.5">
                        {link.description}
                    </span>
                )}
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
                        aria-label={link.visible ? "Hide link" : "Show link"}
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
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                    aria-hidden="true"
                />
            )}
        </a>
    );
}

export function LinksDisplay({
    links,
    isAdmin = false,
    groupByCategory = false,
    onEdit,
    onDelete,
    onToggleVisibility,
}: LinksDisplayProps) {
    const visibleLinks = links
        .filter((link) => link.visible)
        .sort((a, b) => a.order - b.order);

    if (visibleLinks.length === 0) {
        return (
            <div
                className="w-full max-w-xl mx-auto px-4 relative z-10"
                role="region"
                aria-label="Personal links"
            >
                <div className="text-center py-12 text-muted-foreground">
                    <p>No links available yet.</p>
                </div>
            </div>
        );
    }

    if (!groupByCategory || isAdmin) {
        return (
            <div
                className="w-full max-w-xl mx-auto px-4 relative z-10"
                role="region"
                aria-label="Personal links"
            >
                <div className="space-y-3">
                    {visibleLinks.map((link, index) => (
                        <LinkCard
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
            </div>
        );
    }

    // Group by category while preserving first-seen category order.
    const mergedOrder: string[] = [];
    const mergedMap = new Map<string, PersonalLink[]>();
    for (const link of visibleLinks) {
        const category = link.category || "More";
        if (!mergedMap.has(category)) {
            mergedMap.set(category, []);
            mergedOrder.push(category);
        }
        mergedMap.get(category)!.push(link);
    }

    let runningIndex = 0;

    return (
        <div
            className="w-full max-w-xl mx-auto px-4 relative z-10"
            role="region"
            aria-label="Personal links"
        >
            <div className="space-y-8">
                {mergedOrder.map((category) => {
                    const items = mergedMap.get(category)!;
                    return (
                        <div key={category}>
                            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3 px-1">
                                {category}
                            </h2>
                            <div className="space-y-3">
                                {items.map((link) => {
                                    const index = runningIndex++;
                                    return (
                                        <LinkCard
                                            key={link.id}
                                            link={link}
                                            index={Math.min(index, 20)}
                                            isAdmin={isAdmin}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                            onToggleVisibility={onToggleVisibility}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
