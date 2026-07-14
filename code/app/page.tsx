import type { Metadata, Viewport } from "next"
import { generateMetadata, generateViewport, generateJSONLD } from "@/lib/seo"
import Script from "next/script"
import { ThemeSwitcherClient } from "./theme-switcher-client"
import { PerformanceMonitor } from "./performance-monitor"
import { ProfileHeader } from "@/components/profile-header"
import { LinksDisplay } from "@/components/links-display"
import { PageFooter } from "@/components/page-footer"
import { getProfileData } from "@/lib/storage"

export const metadata: Metadata = generateMetadata()
export const viewport: Viewport = generateViewport()

export default async function HomePage() {
  const profileData = await getProfileData()
  const jsonLd = generateJSONLD()

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <PerformanceMonitor />
      <ThemeSwitcherClient />

      <main className="min-h-screen w-full gradient-bg flex flex-col items-center justify-center py-8 sm:py-12 px-4 relative">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-6 relative z-10">
          <ProfileHeader profile={profileData} />
          <LinksDisplay links={profileData.links ?? []} groupByCategory />
          <PageFooter />
        </div>
      </main>
    </>
  )
}
