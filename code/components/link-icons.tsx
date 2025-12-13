import type React from "react";
import {
    Globe,
    Youtube,
    Instagram,
    Linkedin,
    Twitter,
    Github,
    Facebook,
    MessageCircle,
    Send,
    Zap,
    Music,
    Disc3,
    Users,
    Pin,
    Maximize,
    Radio,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ReactNode> = {
    globe: <Globe className="w-5 h-5" />,
    youtube: <Youtube className="w-5 h-5" />,
    instagram: <Instagram className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    github: <Github className="w-5 h-5" />,
    facebook: <Facebook className="w-5 h-5" />,
    discord: <MessageCircle className="w-5 h-5" />,
    telegram: <Send className="w-5 h-5" />,
    threads: <Zap className="w-5 h-5" />,
    soundcloud: <Music className="w-5 h-5" />,
    spotify: <Disc3 className="w-5 h-5" />,
    reddit: <Users className="w-5 h-5" />,
    pinterest: <Pin className="w-5 h-5" />,
    tumblr: <Maximize className="w-5 h-5" />,
    whatsapp: <Radio className="w-5 h-5" />,
};

export function getIconForUrl(url: string): string {
    if (url.includes("youtube.com")) return "youtube";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("x.com") || url.includes("twitter.com")) return "twitter";
    if (url.includes("github.com")) return "github";
    if (url.includes("facebook.com")) return "facebook";
    if (url.includes("discord.gg")) return "discord";
    if (url.includes("t.me")) return "telegram";
    if (url.includes("threads.com")) return "threads";
    if (url.includes("soundcloud.com")) return "soundcloud";
    if (url.includes("spotify.com")) return "spotify";
    if (url.includes("reddit.com")) return "reddit";
    if (url.includes("pinterest.com")) return "pinterest";
    if (url.includes("tumblr.com")) return "tumblr";
    if (url.includes("whatsapp.com")) return "whatsapp";
    return "globe";
}
