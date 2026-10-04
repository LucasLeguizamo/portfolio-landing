"use client"

import { useEffect, useState } from "react"

export function useLocalClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let interval = 0
    const tick = () => setNow(new Date())
    const delay = 60_000 - (Date.now() % 60_000)
    const timeout = window.setTimeout(() => {
      tick()
      interval = window.setInterval(tick, 60_000)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [])

  return now
}

export function formatMenuDate(date: Date, compact: boolean) {
  return new Intl.DateTimeFormat("es", {
    weekday: compact ? "short" : "long",
    day: "numeric",
    month: compact ? "short" : "long",
  }).format(date)
}

export function formatMenuTime(date: Date) {
  return new Intl.DateTimeFormat("es", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}
