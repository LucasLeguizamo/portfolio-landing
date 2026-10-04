import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type ButterflyProps = {
  className?: string
  glowing?: boolean
  style?: CSSProperties
}

export function Butterfly({ className, glowing = true, style }: ButterflyProps) {
  return (
    <span
      className={cn("butterfly", glowing && "butterfly-glow", className)}
      style={style}
      aria-hidden
    >
      <svg viewBox="0 0 64 48" className="h-full w-full">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className="butterfly-wing butterfly-wing-left">
            <path
              d="M30 24 C 8 4, 2 20, 18 26 C 8 30, 12 42, 30 28"
              fill="#f5c400"
              stroke="#e3a800"
              strokeWidth="1.2"
            />
            <path
              d="M22 20 C 14 14, 12 22, 20 24"
              fill="#ffe27a"
              opacity="0.85"
            />
          </g>
          <g className="butterfly-wing butterfly-wing-right">
            <path
              d="M34 24 C 56 4, 62 20, 46 26 C 56 30, 52 42, 34 28"
              fill="#f5c400"
              stroke="#e3a800"
              strokeWidth="1.2"
            />
            <path
              d="M42 20 C 50 14, 52 22, 44 24"
              fill="#ffe27a"
              opacity="0.85"
            />
          </g>
          <path d="M32 10 v22" stroke="#5a3d12" strokeWidth="1.8" />
          <circle cx="32" cy="11" r="1.6" fill="#5a3d12" />
        </g>
      </svg>
    </span>
  )
}
