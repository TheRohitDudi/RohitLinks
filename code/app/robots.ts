import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_BASE_URL;

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: "/admin",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
