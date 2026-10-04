"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

import { GoldenButterfly } from "@/components/sarah-desktop/golden-butterfly"
import { MacFolder } from "@/components/sarah-desktop/mac-folder"
import { MenuBar } from "@/components/sarah-desktop/menu-bar"
import { ToolDock } from "@/components/sarah-desktop/tool-dock"
import { useFolderPositions } from "@/hooks/use-folder-positions"
import { projects } from "@/lib/content"

const REDUCE = "(prefers-reduced-motion: reduce)"
const FINE = "(pointer: fine)"

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }
}

type DesktopSceneProps = {
  entering?: boolean
}

export function DesktopScene({ entering = true }: DesktopSceneProps) {
  const router = useRouter()
  const reduceMotion = useSyncExternalStore(
    subscribeMedia(REDUCE),
    () => window.matchMedia(REDUCE).matches,
    () => false,
  )
  const canDrag = useSyncExternalStore(
    subscribeMedia(FINE),
    () => window.matchMedia(FINE).matches,
    () => false,
  )
  const { positions, moveFolder } = useFolderPositions(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [appeared, setAppeared] = useState(false)
  const [settledAnim, setSettledAnim] = useState(false)
  const dragRef = useRef<{ slug: string; ox: number; oy: number } | null>(null)
  const draggedRef = useRef(false)
  const ready = reduceMotion || !entering || appeared
  const settled = reduceMotion || !entering || settledAnim

  useEffect(() => {
    if (reduceMotion || !entering) return
    const appear = window.setTimeout(() => setAppeared(true), 180)
    const rest = window.setTimeout(() => setSettledAnim(true), 3200)
    return () => {
      window.clearTimeout(appear)
      window.clearTimeout(rest)
    }
  }, [entering, reduceMotion])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" && selected) {
        router.push(`/trabajo/${selected}`)
      }
      if (event.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router, selected])

  const openProject = (slug: string) => {
    router.push(`/trabajo/${slug}`)
  }

  return (
    <div
      className="sarah-os"
      data-ready={ready ? "true" : "false"}
      data-reduced={reduceMotion ? "true" : "false"}
    >
      <div className="sarah-water" />
      <div className="sarah-water-sheen" />
      <MenuBar />
      <GoldenButterfly settled={settled} />

      <div className="sarah-os-folders">
        {projects.map((project, index) => {
          const point = positions[project.slug]
          const style = {
            left: point?.x ?? 120 + index * 150,
            top: point?.y ?? 280,
            ["--delay" as string]: `${120 + index * 70}ms`,
          }
          return (
            <button
              key={project.slug}
              type="button"
              className="sarah-os-folder"
              data-selected={selected === project.slug ? "true" : "false"}
              style={style}
              onPointerDown={(event) => {
                if (!canDrag) return
                const rect = event.currentTarget.getBoundingClientRect()
                draggedRef.current = false
                dragRef.current = {
                  slug: project.slug,
                  ox: event.clientX - (rect.left + rect.width / 2),
                  oy: event.clientY - (rect.top + 36),
                }
                event.currentTarget.setPointerCapture(event.pointerId)
              }}
              onPointerMove={(event) => {
                const drag = dragRef.current
                if (!drag || drag.slug !== project.slug) return
                if (Math.hypot(event.movementX, event.movementY) > 1) draggedRef.current = true
                moveFolder(project.slug, {
                  x: event.clientX - drag.ox,
                  y: event.clientY - drag.oy,
                })
              }}
              onPointerUp={() => {
                dragRef.current = null
              }}
              onClick={() => {
                if (draggedRef.current) return
                if (!canDrag) {
                  openProject(project.slug)
                  return
                }
                setSelected(project.slug)
              }}
              onDoubleClick={() => openProject(project.slug)}
            >
              <MacFolder color={project.color} />
              <span>{project.label}</span>
            </button>
          )
        })}
      </div>

      <ToolDock />
    </div>
  )
}
