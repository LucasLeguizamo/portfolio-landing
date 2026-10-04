"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error("[landing]", error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.28em] text-zinc-500 uppercase">
        Corte
      </p>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
        Esta escena no cargó.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        Algo se rompió al montar la capa. Puedes reintentar sin perder el
        resto del portafolio.
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
