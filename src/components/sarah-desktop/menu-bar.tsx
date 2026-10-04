"use client"

import { formatMenuDate, formatMenuTime, useLocalClock } from "@/hooks/use-local-clock"

const MENUS = ["Archivo", "Edición", "Visualización", "Ir", "Ventana", "Ayuda"] as const

function AppleMark() {
  return (
    <svg viewBox="0 0 18 22" className="h-[13px] w-[11px]" aria-hidden>
      <path
        fill="currentColor"
        d="M13.9 11.6c.03 3.1 2.72 4.13 2.75 4.15-.02.07-.43 1.48-1.42 2.93-.86 1.25-1.75 2.5-3.16 2.52-1.38.03-1.83-.82-3.41-.82-1.59 0-2.08.8-3.39.85-1.36.05-2.4-1.35-3.27-2.6C.26 16.3-.86 12.7.9 10.16c.87-1.26 2.43-2.06 4.12-2.08 1.29-.03 2.5.87 3.3.87.79 0 2.27-1.07 3.83-.91.65.03 2.48.26 3.66 1.98-.09.06-2.18 1.27-2.21 3.58ZM12.1 6.2c.7-.84 1.17-2.02 1.04-3.2-1.01.04-2.23.67-2.95 1.52-.65.75-1.22 1.96-1.07 3.11 1.13.09 2.28-.58 2.98-1.43Z"
      />
    </svg>
  )
}

function WifiMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
      <path
        fill="currentColor"
        d="M12 18.2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0-5.1c1.7 0 3.2.7 4.3 1.8l-1.5 1.5A4.1 4.1 0 0 0 12 15a4.1 4.1 0 0 0-2.8 1.1L7.7 14.6A6 6 0 0 1 12 13.1Zm0-4.3c2.9 0 5.5 1.2 7.4 3.1l-1.5 1.5A8.4 8.4 0 0 0 12 11.2a8.4 8.4 0 0 0-5.9 2.2L4.6 11.9A10.6 10.6 0 0 1 12 8.8Z"
      />
    </svg>
  )
}

function BatteryMark() {
  return (
    <svg viewBox="0 0 28 14" className="h-3 w-6" aria-hidden>
      <rect x="0.7" y="1.2" width="23.5" height="11.6" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2.4" y="3" width="20.2" height="8" rx="1.2" fill="currentColor" />
      <rect x="25.2" y="4.6" width="2" height="4.8" rx="0.8" fill="currentColor" />
    </svg>
  )
}

export function MenuBar() {
  const now = useLocalClock()
  const compact = true
  const dateLabel = formatMenuDate(now, compact)
  const timeLabel = formatMenuTime(now)

  return (
    <header className="sarah-os-menubar">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center text-zinc-900" aria-hidden>
          <AppleMark />
        </span>
        <span className="font-semibold tracking-[-0.02em]">Santana</span>
        <nav aria-label="Menú del escritorio" className="hidden items-center gap-3 sm:flex">
          {MENUS.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2.5 text-[12px] sm:gap-3">
        <span className="hidden opacity-70 sm:inline" aria-hidden>
          ●●●
        </span>
        <WifiMark />
        <span className="flex items-center gap-1.5">
          <span>100%</span>
          <BatteryMark />
        </span>
        <time dateTime={now.toISOString()} className="tabular-nums">
          {dateLabel} {timeLabel}
        </time>
      </div>
    </header>
  )
}
