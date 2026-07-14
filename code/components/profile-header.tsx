"use client";
import Image from "next/image";
import type { ProfileData } from "@/types";
import { ICON_MAP } from "./link-icons";
import { FEATURED_SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { BadgeCheck } from "lucide-react";

interface ProfileHeaderProps {
    profile: ProfileData;
    isPreview?: boolean;
}

export function ProfileHeader({
    profile,
    isPreview = false,
}: ProfileHeaderProps) {
    const quickLinks = [
        ...FEATURED_SOCIAL_LINKS,
        { href: `mailto:${CONTACT_EMAIL}`, icon: "mail" },
    ];

    return (
        <div className="text-center relative z-10 px-4 pt-24 pb-8 sm:pt-28 animate-fade-in">
            {/* Profile Image */}
            <div className="mb-5 flex justify-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white/70 shadow-2xl shadow-black/40">
                        <Image
                            src={require("@/public/header_profile.jpg")}
                            alt={`${profile.name}'s profile picture`}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                    <div
                        className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#00d9ff] flex items-center justify-center ring-[3px] ring-black/40 shadow-lg"
                        title="Verified"
                        aria-label="Verified profile"
                    >
                        <BadgeCheck className="w-4 h-4 text-black" strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-balance leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {profile.name}
            </h1>

            {/* Bio */}
            <p className="text-sm sm:text-base font-medium text-white/90 max-w-xs sm:max-w-sm mx-auto text-balance mb-6 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                {profile.bio}
            </p>

            {/* Social Icon Bar */}
            <div className="flex justify-center items-center gap-5 sm:gap-6 flex-wrap px-4">
                {quickLinks.map(({ href, icon }) => {
                    const label = icon.charAt(0).toUpperCase() + icon.slice(1);
                    const isMailto = href.startsWith("mailto:");
                    return (
                        <a
                            key={href}
                            href={href}
                            target={isMailto ? undefined : "_blank"}
                            rel={isMailto ? undefined : "noopener noreferrer"}
                            aria-label={isMailto ? "Send an email" : label}
                            className="flex items-center justify-center text-white/90 hover:text-white hover:scale-110 transition-all duration-200 [&>svg]:w-6 [&>svg]:h-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                        >
                            {ICON_MAP[icon]}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
