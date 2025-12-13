"use client";
import Image from "next/image";
import type { ProfileData } from "@/types";
import { ICON_MAP, getIconForUrl } from "./link-icons";

interface ProfileHeaderProps {
    profile: ProfileData;
    isPreview?: boolean;
}

export function ProfileHeader({
    profile,
    isPreview = false,
}: ProfileHeaderProps) {
    return (
        <div className="text-center mb-6 relative z-10 px-4 sm:px-0 animate-fade-in">
            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                        <Image
                            src={require("@/public/header_profile.png")}
                            alt={`${profile.name}'s profile picture`}
                            width={144}
                            height={144}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                {profile.name}
            </h1>

            {/* Bio */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto text-balance mb-8 leading-relaxed">
                {profile.bio}
            </p>

            {/* Social Icon Bar - First 5 only, wrapped in single border */}
            <div className="flex justify-center gap-4 mb-3 flex-wrap px-4">
                <div className="flex justify-center gap-4 px-4 py-3 border border-border rounded-2xl bg-card/50">
                    {[
                        { href: "https://www.github.com/RealRohitDudi" },
                        { href: "https://x.com/RealRohitDudi" },
                        { href: "https://www.youtube.com/@RealRohitDudi" },
                        { href: "https://www.linkedin.com/in/RealRohitDudi" },
                        { href: "https://www.instagram.com/realrohitdudi" },
                    ].map(({ href }) => {
                        const iconKey = getIconForUrl(href);
                        return (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={
                                    iconKey.charAt(0).toUpperCase() +
                                    iconKey.slice(1)
                                }
                                className="flex items-center justify-center w-14 h-14 hover:scale-110 transition-transform duration-200"
                            >
                                <span className="text-white hover:text-primary transition-colors [&>svg]:w-7 [&>svg]:h-7">
                                    {ICON_MAP[iconKey]}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
