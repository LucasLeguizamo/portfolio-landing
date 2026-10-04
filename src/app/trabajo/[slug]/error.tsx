"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

// Ejemplos: el slug existe pero el caso no hidrató; un import del layout falló.
export default function ProjectError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error("[trabajo]", error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.28em] text-zinc-500 uppercase">
        Carpeta
      </p>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
        Este caso no cargó.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        La carpeta se abrió, pero la escena se rompió. Puedes reintentar o
        volver al escritorio.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-[11px] text-muted-foreground">
          {error.digest}
        </p>
      ) : null}
      <Button type="button" className="mt-8 h-11 px-5" onClick={retry}>
        Reintentar
      </Button>
    </div>
  )
}
