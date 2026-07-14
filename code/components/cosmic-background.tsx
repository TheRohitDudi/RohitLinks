import Image from "next/image";

export function CosmicBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <div className="absolute inset-0 animate-bg-pan will-change-transform">
                <Image
                    src="/cosmic-bg.webp"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 stars-twinkle" aria-hidden="true" />
            {/* Darken top for the floating corner buttons */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
            {/* Progressively darken toward the bottom so the pill links stay legible */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/55 to-background" />
        </div>
    );
}
