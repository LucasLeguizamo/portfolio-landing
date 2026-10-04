import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.28em] text-zinc-500 uppercase">
        404
      </p>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
        Esta escena no existe.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        El frame que buscas no está en el storyboard. Vuelve al título y
        recorre las capas que sí están montadas.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-5")}
      >
        Ir al título
      </Link>
    </div>
  )
}
