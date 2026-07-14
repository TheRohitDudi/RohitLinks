import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_BASE_URL;

    // A sitemap must only list URLs that live on this site's own domain.
    // Third-party social profile URLs (and /admin, which robots.txt disallows)
    // are intentionally excluded here.
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];
}
