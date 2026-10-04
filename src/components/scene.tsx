import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SceneProps = {
  id: string
  number: string
  kicker: string
  title: string
  children: ReactNode
  className?: string
}

export function Scene({
  id,
  number,
  kicker,
  title,
  children,
  className,
}: SceneProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 border-t border-border/70 px-16 py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-16">
        <header className="mb-14 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.28em] text-primary">
            {number}
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {kicker}
          </span>
        </header>
        <h2 className="max-w-3xl font-sans text-6xl leading-[1.05] font-extrabold tracking-tight text-balance">
          {title}
        </h2>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}
