"use client"

import type { RefObject } from "react"
import { Canvas } from "@react-three/fiber"

import { SarahScene } from "@/components/world-3d/sarah-scene"

type WorldCanvasProps = {
  progress: number
  progressRef: RefObject<number>
}

export function WorldCanvas({ progress, progressRef }: WorldCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [4.15, 1.72, 4.9], fov: 32, near: 0.1, far: 40 }}
      gl={{ antialias: true }}
    >
      <SarahScene progress={progress} progressRef={progressRef} />
    </Canvas>
  )
}
