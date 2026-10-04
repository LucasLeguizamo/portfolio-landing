"use client"

import { useEffect, useState, type RefObject } from "react"

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const total = element.offsetHeight - window.innerHeight
      if (total <= 0) {
        setProgress(0)
        return
      }

      const scrolled = window.scrollY - element.offsetTop
      setProgress(Math.min(1, Math.max(0, scrolled / total)))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [ref])

  return progress
}
