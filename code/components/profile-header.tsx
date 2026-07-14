"use client";
import Image from "next/image";
import type { ProfileData } from "@/types";
import { ICON_MAP } from "./link-icons";
import { FEATURED_SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { BadgeCheck, Mail } from "lucide-react";

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
                    <div
                        className="absolute -inset-2 rounded-full opacity-60 animate-avatar-glow"
                        style={{
                            background:
                                "conic-gradient(from 0deg, var(--primary), var(--accent), var(--secondary), var(--primary))",
                            filter: "blur(14px)",
                        }}
                        aria-hidden="true"
                    />
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-primary/30 hover:ring-primary/60 transition-all duration-300 shadow-2xl">
                        <Image
                            src={require("@/public/header_profile.png")}
                            alt={`${profile.name}'s profile picture`}
                            width={144}
                            height={144}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                    <div
                        className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center ring-4 ring-background shadow-lg"
                        title="Verified"
                        aria-label="Verified profile"
                    >
                        <BadgeCheck className="w-5 h-5 text-primary-foreground" />
                    </div>
                </div>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance leading-tight">
                {profile.name}
            </h1>

            {/* Bio */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto text-balance mb-6 leading-relaxed">
                {profile.bio}
            </p>

            {/* Email CTA */}
            <div className="mb-8 flex justify-center">
                <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm sm:text-base text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--primary), var(--accent))",
                    }}
                    aria-label={`Send an email to ${CONTACT_EMAIL}`}
                >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-rotate-6" />
                    Say Hello
                </a>
            </div>

            {/* Social Icon Bar - Featured accounts, wrapped in single border */}
            <div className="flex justify-center gap-4 mb-3 flex-wrap px-4">
                <div className="flex justify-center gap-4 px-4 py-3 border border-border rounded-2xl glass-card">
                    {FEATURED_SOCIAL_LINKS.map(({ href, icon }) => {
                        const label = icon.charAt(0).toUpperCase() + icon.slice(1);
                        return (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex items-center justify-center w-14 h-14 hover:scale-110 transition-transform duration-200"
                            >
                                <span className="text-white hover:text-primary transition-colors [&>svg]:w-7 [&>svg]:h-7">
                                    {ICON_MAP[icon]}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
