import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    generator: "v0.app",
    icons: {
        icon: [
            {
                url: "/favicon.png",
                sizes: "any",
            },
        ],
        apple: {
            url: "/favicon.png",
            sizes: "180x180",
        },
        shortcut: "/favicon.png",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preload critical fonts for performance */}
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@400;700&display=swap"
                    as="style"
                />
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&display=swap"
                    as="style"
                />
                {/* Google Site Verification */}
                <meta
                    name="google-site-verification"
                    content="tziaHAHC1l1FcK8MvSbKARbP83hZ1GHmlYzpyHeNa6Y"
                />
                {/* Preconnects */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="dns-prefetch" href="https://cdn.vercel.com" />
            </head>
            <body className={`font-sans antialiased`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
