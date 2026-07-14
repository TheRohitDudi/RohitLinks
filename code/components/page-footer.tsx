"use client";

import { FOOTER_SITES } from "@/lib/constants";

export function PageFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 mt-14 bg-background/80 backdrop-blur-md border-t border-white/10">
            <div className="max-w-xl mx-auto px-4 py-8 text-center">
                <nav
                    className="flex justify-center items-center gap-x-3 gap-y-2 text-xs text-white/60 mb-5 flex-wrap"
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
                                <span className="text-white/25" aria-hidden="true">
                                    ·
                                </span>
                            )}
                        </span>
                    ))}
                </nav>
                <p className="text-xs text-white/35">
                    © {currentYear} Rohit Dudi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
