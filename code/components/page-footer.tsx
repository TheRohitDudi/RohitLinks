"use client";

export function PageFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 mb-12 relative z-10 pt-8">
            <div className="max-w-xl mx-auto px-4 text-center">
                <p className="text-sm text-muted-foreground mb-6">
                    Connect with Rohit Dudi across all platforms
                </p>
                <div className="flex justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-6 flex-wrap">
                    <a
                        href="https://devrohitdudi.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Website
                    </a>
                    <a
                        href="https://www.youtube.com/@RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        YouTube
                    </a>
                    <a
                        href="https://www.instagram.com/realrohitdudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.linkedin.com/in/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://x.com/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        X
                    </a>
                    <a
                        href="https://www.github.com/RealRohitDudi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        GitHub
                    </a>
                </div>
                <p className="text-xs text-muted-foreground/50">
                    © {currentYear} Rohit Dudi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
