import type React from "react";
import { Globe, Linkedin, Mail, Users as UsersFallback, Megaphone } from "lucide-react";
import {
    SiYoutube,
    SiInstagram,
    SiX,
    SiGithub,
    SiFacebook,
    SiDiscord,
    SiTelegram,
    SiThreads,
    SiSoundcloud,
    SiSpotify,
    SiReddit,
    SiPinterest,
    SiTumblr,
    SiWhatsapp,
    SiPatreon,
    SiSteam,
    SiTwitch,
    SiQuora,
    SiBluesky,
    SiMastodon,
    SiMedium,
    SiSubstack,
    SiGoodreads,
    SiPexels,
    SiPixabay,
    SiStackoverflow,
    SiMinds,
    SiVk,
    SiDailymotion,
    SiRumble,
    SiDeviantart,
    SiImdb,
    SiLetterboxd,
} from "react-icons/si";

export const ICON_MAP: Record<string, React.ReactNode> = {
    globe: <Globe className="w-5 h-5" />,
    youtube: <SiYoutube className="w-5 h-5" />,
    instagram: <SiInstagram className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    twitter: <SiX className="w-5 h-5" />,
    github: <SiGithub className="w-5 h-5" />,
    facebook: <SiFacebook className="w-5 h-5" />,
    discord: <SiDiscord className="w-5 h-5" />,
    telegram: <SiTelegram className="w-5 h-5" />,
    threads: <SiThreads className="w-5 h-5" />,
    soundcloud: <SiSoundcloud className="w-5 h-5" />,
    spotify: <SiSpotify className="w-5 h-5" />,
    reddit: <SiReddit className="w-5 h-5" />,
    pinterest: <SiPinterest className="w-5 h-5" />,
    tumblr: <SiTumblr className="w-5 h-5" />,
    whatsapp: <SiWhatsapp className="w-5 h-5" />,
    patreon: <SiPatreon className="w-5 h-5" />,
    steam: <SiSteam className="w-5 h-5" />,
    twitch: <SiTwitch className="w-5 h-5" />,
    quora: <SiQuora className="w-5 h-5" />,
    bluesky: <SiBluesky className="w-5 h-5" />,
    mastodon: <SiMastodon className="w-5 h-5" />,
    medium: <SiMedium className="w-5 h-5" />,
    substack: <SiSubstack className="w-5 h-5" />,
    goodreads: <SiGoodreads className="w-5 h-5" />,
    pexels: <SiPexels className="w-5 h-5" />,
    pixabay: <SiPixabay className="w-5 h-5" />,
    stackoverflow: <SiStackoverflow className="w-5 h-5" />,
    minds: <SiMinds className="w-5 h-5" />,
    vk: <SiVk className="w-5 h-5" />,
    dailymotion: <SiDailymotion className="w-5 h-5" />,
    rumble: <SiRumble className="w-5 h-5" />,
    deviantart: <SiDeviantart className="w-5 h-5" />,
    imdb: <SiImdb className="w-5 h-5" />,
    letterboxd: <SiLetterboxd className="w-5 h-5" />,
    // Not (yet) part of the Simple Icons set - use a tasteful generic fallback.
    truthsocial: <Megaphone className="w-5 h-5" />,
    locals: <UsersFallback className="w-5 h-5" />,
    mail: <Mail className="w-5 h-5" />,
};

export function getIconForUrl(url: string): string {
    if (url.startsWith("mailto:")) return "mail";
    if (url.includes("youtube.com")) return "youtube";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("x.com") || url.includes("twitter.com")) return "twitter";
    if (url.includes("github.com")) return "github";
    if (url.includes("facebook.com")) return "facebook";
    if (url.includes("discord.gg") || url.includes("discord.com")) return "discord";
    if (url.includes("t.me")) return "telegram";
    if (url.includes("threads.net") || url.includes("threads.com")) return "threads";
    if (url.includes("soundcloud.com")) return "soundcloud";
    if (url.includes("spotify.com")) return "spotify";
    if (url.includes("reddit.com")) return "reddit";
    if (url.includes("pinterest.com")) return "pinterest";
    if (url.includes("tumblr.com")) return "tumblr";
    if (url.includes("whatsapp.com")) return "whatsapp";
    if (url.includes("patreon.com")) return "patreon";
    if (url.includes("steamcommunity.com") || url.includes("store.steampowered.com")) return "steam";
    if (url.includes("twitch.tv")) return "twitch";
    if (url.includes("quora.com")) return "quora";
    if (url.includes("bsky.app")) return "bluesky";
    if (url.includes("mastodon.social") || url.includes("mastodon.")) return "mastodon";
    if (url.includes("medium.com")) return "medium";
    if (url.includes("substack.com")) return "substack";
    if (url.includes("goodreads.com")) return "goodreads";
    if (url.includes("pexels.com")) return "pexels";
    if (url.includes("pixabay.com")) return "pixabay";
    if (url.includes("stackoverflow.com")) return "stackoverflow";
    if (url.includes("minds.com")) return "minds";
    if (url.includes("vk.com")) return "vk";
    if (url.includes("dailymotion.com")) return "dailymotion";
    if (url.includes("truthsocial.com")) return "truthsocial";
    if (url.includes("rumble.com")) return "rumble";
    if (url.includes("locals.com")) return "locals";
    if (url.includes("deviantart.com")) return "deviantart";
    if (url.includes("imdb.com")) return "imdb";
    if (url.includes("letterboxd.com")) return "letterboxd";
    return "globe";
}
