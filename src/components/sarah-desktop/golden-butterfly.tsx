"use client"

import { Butterfly } from "@/components/butterfly"

export function GoldenButterfly({ settled }: { settled: boolean }) {
  return (
    <div
      className="sarah-os-butterfly"
      data-settled={settled ? "true" : "false"}
      aria-hidden
    >
      <span className="sarah-os-trail" />
      <span className="sarah-os-trail sarah-os-trail-2" />
      <Butterfly className="h-16 w-20" />
    </div>
  )
}
