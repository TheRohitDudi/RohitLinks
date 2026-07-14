"use client";

import type { ThemeSettings } from "@/types";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme } from "@/lib/theme-utils";

interface ThemeSwitcherProps {
    theme: ThemeSettings;
    onThemeChange: (theme: ThemeSettings) => void;
}

export function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        applyTheme(theme);
    }, [theme]);

    if (!mounted) return null;

    const isDark = theme.mode === "dark";

    return (
        <button
            onClick={() => onThemeChange({ ...theme, mode: isDark ? "light" : "dark" })}
            className="glass-icon-btn flex items-center justify-center w-11 h-11 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}
