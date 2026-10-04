import { AboutScene } from "@/components/about-scene"
import { ContactScene } from "@/components/contact-scene"
import { HeroJourney } from "@/components/hero-journey"
import { WorkScene } from "@/components/work-scene"

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroJourney />
      <WorkScene />
      <AboutScene />
      <ContactScene />
    </main>
  )
}
