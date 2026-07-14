"use client";

import { FOOTER_SITES } from "@/lib/constants";

export function PageFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 mb-12 relative z-10 pt-8 border-t border-border/50">
            <div className="max-w-xl mx-auto px-4 text-center">
                <nav
                    className="flex justify-center items-center gap-x-3 gap-y-2 text-xs text-muted-foreground mb-6 flex-wrap"
                    aria-label="Rohit Dudi websites"
                >
                    {FOOTER_SITES.map((site, index) => (
                        <span key={site.href} className="flex items-center gap-x-3">
                            <a
                                href={site.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                {site.label}
                            </a>
                            {index < FOOTER_SITES.length - 1 && (
                                <span
                                    className="text-muted-foreground/30"
                                    aria-hidden="true"
                                >
                                    ·
                                </span>
                            )}
                        </span>
                    ))}
                </nav>
                <p className="text-xs text-muted-foreground/50">
                    © {currentYear} Rohit Dudi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
