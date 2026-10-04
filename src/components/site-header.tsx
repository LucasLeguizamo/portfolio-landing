import Link from "next/link"

import { nav, site } from "@/lib/content"

export function SiteHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div className="pointer-events-auto flex h-20 w-full items-center justify-between px-[6vw]">
        <Link
          href="#inicio"
          className="text-[11px] font-medium tracking-[0.28em] text-zinc-800 uppercase"
        >
          {site.name}
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-4 sm:gap-10">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.22em] text-zinc-700 uppercase transition-colors hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
