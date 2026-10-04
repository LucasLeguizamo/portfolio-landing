"use client"

import { Component, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ACESFilmicToneMapping, SRGBColorSpace, type PerspectiveCamera } from "three"

import { GoldButterfly } from "@/components/sarah-room/gold-butterfly"
import { SarahFigure } from "@/components/sarah-room/sarah-figure"
import { applySarahCamera, sceneBridge } from "@/components/sarah-room/scene-bridge"
import { Studio } from "@/components/sarah-room/studio"
import { createSarahMotion, stepSarahMotion, type SarahMotion } from "@/components/sarah-sdf/sarah-motion"

function Director({
  progressRef,
  playingRef,
}: {
  progressRef: RefObject<number>
  playingRef: RefObject<boolean>
}) {
  const motion = useRef<SarahMotion>(null)
  const { camera, size } = useThree()

  useFrame((_, delta) => {
    if (!motion.current) motion.current = createSarahMotion()
    const sim = motion.current
    if (playingRef.current) {
      stepSarahMotion(sim, Math.min(0.05, delta), progressRef.current ?? 0)
    }
    sceneBridge.params = sim.params
    applySarahCamera(camera as PerspectiveCamera, sim.params, size.width, size.height)
  })

  return null
}

function Lights() {
  return (
    <>
      <hemisphereLight args={["#fff6ea", "#c9a27a", 0.72]} />
      <ambientLight intensity={0.18} color="#fff1e0" />
      <directionalLight
        position={[-2.4, 3.2, 1.4]}
        intensity={2.4}
        color="#ffe2bf"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.4}
        shadow-camera-far={8}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[1.6, 1.8, -1.4]} intensity={0.55} color="#ffd0e2" />
      <pointLight position={[0.3, 0.9, 0.28]} intensity={3.2} distance={2.6} decay={2} color="#ffb15a" />
    </>
  )
}

class RoomError extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="sarah-fallback">
          El escritorio 3D no pudo arrancar en este navegador. Recarga la página; si sigue igual, abre Chrome o Safari reciente.
        </p>
      )
    }
    return this.props.children
  }
}

const REDUCED = "(prefers-reduced-motion: reduce)"

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

export function SarahRoom({
  name,
  progressRef,
}: {
  name: string
  progressRef: RefObject<number>
}) {
  const reduce = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false)
  const [choice, setChoice] = useState<boolean | null>(null)
  const playing = choice ?? !reduce
  const playingRef = useRef(playing)
  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  return (
    <div className="sarah-stage">
    <RoomError>
      <Canvas
        className="sarah-canvas"
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [1.2, 1.15, 1.5], fov: 38, near: 0.04, far: 24 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace
        }}
      >
        <Director progressRef={progressRef} playingRef={playingRef} />
        <Lights />
        <Studio />
        <SarahFigure />
        <GoldButterfly />
      </Canvas>
      <button type="button" className="sarah-toggle" onClick={() => setChoice(!playing)}>
        {playing ? `Pausar a ${name}` : `Animar a ${name}`}
      </button>
    </RoomError>
    </div>
  )
}
