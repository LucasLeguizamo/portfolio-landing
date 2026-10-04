"use client"

import { useRef, type RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import { ContactShadows, Environment } from "@react-three/drei"
import { PerspectiveCamera, Vector3 } from "three"

import { Butterfly3D } from "@/components/world-3d/butterfly-3d"
import { sampleCamera } from "@/components/world-3d/camera-path"
import { Character } from "@/components/world-3d/character"
import { InnerWorld } from "@/components/world-3d/inner-world"
import { palette } from "@/components/world-3d/palette"
import { Room } from "@/components/world-3d/room"

type SarahSceneProps = {
  progress: number
  progressRef: RefObject<number>
}

export function SarahScene({ progress, progressRef }: SarahSceneProps) {
  const goalPos = useRef(new Vector3())
  const goalLook = useRef(new Vector3())
  const smoothLook = useRef(new Vector3(0.15, 1.05, 0.1))
  const inner = Math.max(0, (progress - 0.8) / 0.2)

  useFrame((state, delta) => {
    const next = sampleCamera(progressRef.current)
    const damp = 1 - Math.pow(0.012, delta)
    goalPos.current.set(...next.pos)
    goalLook.current.set(...next.look)
    state.camera.position.lerp(goalPos.current, damp)
    smoothLook.current.lerp(goalLook.current, damp)
    state.camera.lookAt(smoothLook.current)
    const camera = state.camera as PerspectiveCamera
    camera.fov += (next.fov - camera.fov) * damp
    camera.updateProjectionMatrix()
  })

  return (
    <>
      <color attach="background" args={[palette.cream]} />
      <fog attach="fog" args={[palette.cream, 10, 22]} />
      <ambientLight intensity={0.48} color="#fff3dc" />
      <hemisphereLight args={["#fff4d6", "#e8d2a8", 0.45]} />
      <directionalLight
        position={[4.4, 5.8, 3.6]}
        intensity={2.05}
        color="#ffd089"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0002}
      />
      <pointLight position={[0.1, 1.15, -0.55]} intensity={0.55} color="#ffe08a" distance={2.4} />
      <Environment preset="apartment" environmentIntensity={0.28} />
      <group visible={inner < 0.85}>
        <Room />
        <Character />
        <Butterfly3D progressRef={progressRef} />
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.28}
          scale={8}
          blur={2.4}
          far={3}
        />
      </group>
      <InnerWorld visible={inner} />
    </>
  )
}
