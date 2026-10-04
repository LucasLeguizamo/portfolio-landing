"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"

import { Butterfly } from "@/components/butterfly"
import { SiteHeader } from "@/components/site-header"
import { site } from "@/lib/content"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

const SarahRoom = dynamic(
  () => import("@/components/sarah-room/SarahRoom").then((module) => module.SarahRoom),
  { ssr: false, loading: () => <div className="sarah-stage" aria-hidden /> },
)

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function HeroJourney() {
  const trackRef = useRef<HTMLElement>(null)
  const progressRef = useRef(0)
  const progress = useScrollProgress(trackRef)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    window.history.replaceState(null, "", "/")
    window.scrollTo(0, 0)
  }, [])

  const intro = 1 - clamp(progress / 0.22)
  const reveal = clamp((progress - 0.86) / 0.14)

  return (
    <section
      ref={trackRef}
      id="inicio"
      data-hero="sdf"
      className="relative h-[480vh]"
      aria-label="Header de Sarah Santana"
    >
      <div
        className="sticky top-0 h-dvh overflow-hidden bg-transparent"
        data-late={reveal > 0.2 ? "true" : "false"}
      >
        <SarahRoom name={site.firstName} progressRef={progressRef} />
        <div className="sarah-os-veil" style={{ opacity: reveal }} />

        <div style={{ opacity: intro, pointerEvents: intro < 0.08 ? "none" : undefined }}>
          <SiteHeader />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center"
          style={{
            opacity: intro,
            display: intro < 0.02 ? "none" : undefined,
          }}
        >
          <div className="relative max-w-[34rem] pr-6 pl-[6vw]">
            <Butterfly
              className="absolute -top-10 left-16 h-8 w-11 rotate-[-18deg]"
            />
            <Butterfly className="absolute top-6 -left-8 h-6 w-9 rotate-[22deg]" />
            <Butterfly className="absolute top-24 right-0 h-5 w-8 rotate-[-8deg]" />
            <h1 className="pointer-events-auto font-heading text-[clamp(2.8rem,5.6vw,4.6rem)] leading-[0.92] font-semibold tracking-[-0.03em] text-zinc-950">
              {site.firstName} {site.lastName}
            </h1>
            <p className="mt-3 font-heading text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-zinc-950">
              {site.role}
            </p>
            <a
              href="#trabajo"
              className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--sarah-yellow)] px-6 py-2.5 text-[15px] font-medium text-zinc-900 shadow-[0_8px_24px_rgba(245,196,0,0.28)]"
            >
              {site.cta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
