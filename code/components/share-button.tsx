"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareModal } from "@/components/share-modal";
import { DEFAULT_PROFILE, SITE_URL_SLUG } from "@/lib/constants";
import { SITE_BASE_URL } from "@/lib/seo";

export function ShareButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="glass-icon-btn fixed top-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Share this page"
            >
                <Share2 className="w-5 h-5" />
            </button>

            <ShareModal
                open={open}
                onOpenChange={setOpen}
                title="Share Rohit Dudi"
                url={typeof window !== "undefined" ? window.location.href : SITE_BASE_URL}
                preview={{
                    image: "/header_profile.jpg",
                    verified: true,
                    heading: DEFAULT_PROFILE.handle || DEFAULT_PROFILE.name,
                    domain: SITE_URL_SLUG,
                    description: DEFAULT_PROFILE.bio,
                }}
            />
        </>
    );
}
