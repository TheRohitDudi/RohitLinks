"use client";

import React, { useEffect } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { getTheme, saveTheme } from "@/lib/storage";
import { applyTheme } from "@/lib/theme-utils";
import { DEFAULT_LINKS, DEFAULT_PROFILE } from "@/lib/constants";
import { ProfileHeader } from "@/components/profile-header";
import { LinksDisplay } from "@/components/links-display";
import { PageFooter } from "@/components/page-footer";

export function ThemeSwitcherClient() {
    const [theme, setTheme] = React.useState<import("@/types").ThemeSettings>({
        mode: "dark",
        accentColor: "cyan",
    });
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = getTheme();
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const handleThemeChange = (newTheme: typeof theme) => {
        setTheme(newTheme);
        saveTheme(newTheme);
        applyTheme(newTheme);
    };

    if (!mounted) return null;

    // Sticky theme switcher only
    return (
        <div className="fixed top-5 left-5 z-50">
            <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
        </div>
    );
}
