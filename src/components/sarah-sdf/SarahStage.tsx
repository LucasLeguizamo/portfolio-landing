"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react"
import { effect, frame, frameLoop, init, surface } from "vgpu"
import type { FrameLoopHandle } from "vgpu"

import { SARAH_WGSL } from "@/components/sarah-sdf/sarah-shader"
import {
  CANVAS_H,
  CANVAS_W,
  createSarahMotion,
  relight,
  stepSarahMotion,
} from "@/components/sarah-sdf/sarah-motion"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

type StageProps = {
  name: string
  progressRef: RefObject<number>
}

function useSarah(
  stageRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  playing: boolean,
  progressRef: RefObject<number>,
) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const playingRef = useRef(playing)
  const controlRef = useRef<{ play: () => void; pause: () => void } | null>(null)

  useEffect(() => {
    playingRef.current = playing
    if (playing) controlRef.current?.play()
    else controlRef.current?.pause()
  }, [playing])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    let disposed = false
    let gpu: Awaited<ReturnType<typeof init>> | undefined
    let fx: ReturnType<typeof effect> | undefined
    let canvasSurface: ReturnType<typeof surface> | undefined
    let loop: FrameLoopHandle | undefined
    let visible = false
    let pointer: { x: number; y: number } | null = null
    const motion = createSarahMotion()
    const params = motion.params

    const look = () => {
      if (!pointer) return null
      const r = canvas.getBoundingClientRect()
      return { dx: pointer.x - (r.left + r.width / 2), dy: r.top + r.height * 0.4 - pointer.y }
    }
    const drawOnce = () => {
      if (!gpu || !fx || !canvasSurface) return
      relight(motion, look())
      fx.set({ params: { light: params.light } })
      frame(gpu, (f) => f.pass(canvasSurface!, fx!))
    }
    const attachSurface = (maxDpr: number) => {
      canvasSurface?.dispose()
      canvasSurface = surface(gpu!, canvas, {
        dpr: [1, maxDpr],
        clearColor: [0, 0, 0, 0],
      } as Parameters<typeof surface>[2])
      canvasSurface.onResize(({ width, height }) => {
        params.res = [width, height]
        fx!.set({ params: { res: params.res } })
      })
    }

    let frames = 0
    let slowTime = 0
    let lastT = performance.now()
    const tick = (dt: number) => {
      stepSarahMotion(motion, dt, progressRef.current ?? 0)
      relight(motion, look())
    }
    const start = () => {
      if (loop || !gpu || !fx || !canvasSurface || !visible || !playingRef.current) return
      lastT = performance.now()
      loop = frameLoop(gpu, (f) => {
        const now = performance.now()
        const dt = Math.min(0.1, (now - lastT) / 1000)
        lastT = now
        if (frames < 120) {
          frames++
          slowTime += dt
          if (frames === 120 && slowTime / frames > 1 / 40) attachSurface(1)
        }
        tick(dt)
        fx!.set({ params })
        f.pass(canvasSurface!, fx!)
      })
    }
    const stop = () => {
      loop?.stop()
      loop = undefined
    }
    controlRef.current = {
      play: start,
      pause: () => {
        stop()
        drawOnce()
      },
    }

    const onPointer = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY }
      if (!loop && visible) drawOnce()
    }
    window.addEventListener("pointermove", onPointer, { passive: true })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })

    ;(async () => {
      try {
        gpu = await init()
        if (disposed) {
          gpu.dispose()
          return
        }
        fx = effect(gpu, SARAH_WGSL, { label: "sarah", set: { params } })
        attachSurface(2)
        tick(0)
        fx.set({ params })
        io.observe(stage)
        drawOnce()
        setReady(true)
      } catch (error) {
        console.error("Sarah WebGPU:", error)
        if (!disposed) setFailed(true)
      }
    })()

    return () => {
      disposed = true
      io.disconnect()
      window.removeEventListener("pointermove", onPointer)
      stop()
      controlRef.current = null
      gpu?.dispose()
    }
  }, [stageRef, canvasRef, progressRef])

  return { ready, failed }
}

export function SarahStage({ name, progressRef }: StageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false)
  const [choice, setChoice] = useState<boolean | null>(null)
  const playing = choice ?? !reduceMotion
  const { ready, failed } = useSarah(stageRef, canvasRef, playing, progressRef)

  return (
    <div className="sarah-stage" ref={stageRef}>
      <canvas
        ref={canvasRef}
        className="sarah-canvas"
        width={CANVAS_W}
        height={CANVAS_H}
        aria-hidden="true"
      />
      {failed && (
        <p className="sarah-fallback">
          Sarah se dibuja con WebGPU. Abrí este hero en Chrome, Edge o Safari reciente;
          sin GPU el lienzo se queda en crema a propósito.
        </p>
      )}
      {ready && (
        <button type="button" className="sarah-toggle" onClick={() => setChoice(!playing)}>
          {playing ? `Pausar a ${name}` : `Animar a ${name}`}
        </button>
      )}
    </div>
  )
}
