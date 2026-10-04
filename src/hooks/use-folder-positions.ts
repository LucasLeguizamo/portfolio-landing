"use client"

import { useCallback, useEffect, useState } from "react"

import { projects } from "@/lib/content"

const STORAGE_KEY = "sarah.desktop.folders.v1"

export type FolderPoint = { x: number; y: number }

function defaultLayout(width: number, height: number): Record<string, FolderPoint> {
  const count = projects.length
  const gap = Math.min(168, Math.max(120, width / (count + 1)))
  const total = gap * (count - 1)
  const start = width / 2 - total / 2
  const y = Math.min(height * 0.38, height - 220)
  const layout: Record<string, FolderPoint> = {}
  projects.forEach((project, index) => {
    layout[project.slug] = { x: start + gap * index, y }
  })
  return layout
}

function clampPoint(point: FolderPoint, width: number, height: number): FolderPoint {
  return {
    x: Math.min(width - 56, Math.max(56, point.x)),
    y: Math.min(height - 150, Math.max(72, point.y)),
  }
}

function readStored(width: number, height: number) {
  const fallback = defaultLayout(width, height)
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Record<string, FolderPoint>
    const next = { ...fallback }
    for (const project of projects) {
      const saved = parsed[project.slug]
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
        next[project.slug] = clampPoint(saved, width, height)
      }
    }
    return next
  } catch {
    return fallback
  }
}

export function useFolderPositions(enabled: boolean) {
  const [positions, setPositions] = useState<Record<string, FolderPoint>>(() =>
    defaultLayout(1280, 800),
  )

  useEffect(() => {
    if (!enabled) return
    const apply = () => {
      setPositions(readStored(window.innerWidth, window.innerHeight))
    }
    apply()
    window.addEventListener("resize", apply)
    return () => window.removeEventListener("resize", apply)
  }, [enabled])

  const moveFolder = useCallback((slug: string, point: FolderPoint) => {
    setPositions((current) => {
      const next = {
        ...current,
        [slug]: clampPoint(point, window.innerWidth, window.innerHeight),
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { positions, moveFolder }
}
