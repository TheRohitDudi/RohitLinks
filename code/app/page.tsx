import type { Metadata, Viewport } from "next"
import { generateMetadata, generateViewport, generateJSONLD } from "@/lib/seo"
import Script from "next/script"
import { ThemeSwitcherClient } from "./theme-switcher-client"
import { PerformanceMonitor } from "./performance-monitor"
import { CosmicBackground } from "@/components/cosmic-background"
import { ShareButton } from "@/components/share-button"
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
      <CosmicBackground />
      <ThemeSwitcherClient />
      <ShareButton />

      <main className="min-h-screen w-full flex flex-col items-center pb-4 px-4 relative">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center relative z-10">
          <ProfileHeader profile={profileData} />
          <LinksDisplay links={profileData.links ?? []} />
        </div>
        <div className="w-full mt-auto">
          <PageFooter />
        </div>
      </main>
    </>
  )
}
