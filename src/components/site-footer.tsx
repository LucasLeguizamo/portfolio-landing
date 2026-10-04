import Link from "next/link"

import { site } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-8 py-10">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
        <p className="text-[11px] font-medium tracking-[0.22em] text-zinc-700 uppercase">
          {site.name}
        </p>
        <div className="flex gap-8 text-[11px] tracking-[0.18em] text-zinc-500 uppercase">
          <Link href="#inicio" className="hover:text-zinc-900">
            Inicio
          </Link>
          <Link href="#sobre" className="hover:text-zinc-900">
            Sobre mí
          </Link>
          <Link href="#contacto" className="hover:text-zinc-900">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}
