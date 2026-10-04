"use client"

import { useRef, useState } from "react"

import { DockIcon } from "@/components/sarah-desktop/dock-icons"
import { dockTools } from "@/lib/content"

const REST = dockTools.map(() => 1)

export function ToolDock() {
  const rowRef = useRef<HTMLDivElement>(null)
  const [scales, setScales] = useState(REST)

  return (
    <div
      className="sarah-os-dock"
      onMouseLeave={() => setScales(REST)}
    >
      <div
        ref={rowRef}
        className="flex items-end gap-2 px-1"
        onMouseMove={(event) => {
          const row = rowRef.current
          if (!row) return
          const next = dockTools.map((_, index) => {
            const child = row.children[index] as HTMLElement | undefined
            if (!child) return 1
            const rect = child.getBoundingClientRect()
            const dist = Math.abs(event.clientX - (rect.left + rect.width / 2))
            return 1 + 0.52 * Math.exp(-(dist * dist) / (2 * 46 * 46))
          })
          setScales(next)
        }}
      >
        {dockTools.map((tool, index) => {
          const scale = scales[index] ?? 1
          return (
            <button
              key={tool.id}
              type="button"
              className="sarah-os-dock-item"
              style={{
                width: `${48 * scale}px`,
                height: `${48 * scale}px`,
              }}
              aria-label={tool.name}
            >
              <span className="sarah-os-tooltip">{tool.name}</span>
              <DockIcon id={tool.id} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
