"use client"

import { useEffect, useState } from "react"

export const MAC_WIDTH = 1440
export const MAC_HEIGHT = 900

export function useMacScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const next = Math.min(
        window.innerWidth / MAC_WIDTH,
        window.innerHeight / MAC_HEIGHT,
      )
      setScale(Number.isFinite(next) && next > 0 ? next : 1)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return scale
}
