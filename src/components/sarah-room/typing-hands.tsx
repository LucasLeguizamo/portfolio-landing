"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group } from "three"

import { skinMat } from "@/components/sarah-room/materials"
import { sceneBridge } from "@/components/sarah-room/scene-bridge"

/** Ata el tipeo de la simulación a las manos. Directora, noche autónoma. */
export function TypingHands() {
  const group = useRef<Group>(null)

  useFrame(() => {
    const params = sceneBridge.params
    if (!params || !group.current) return
    const type = (params.armL[0] - 0.85) * 0.28
    const other = (params.armR[0] - 0.85) * 0.2
    group.current.position.set(0, type * 0.35, 0.31 + type * 0.15)
    group.current.rotation.x = type * 0.8
    group.current.children[0] && (group.current.children[0].position.y = 0.71 + type)
    group.current.children[1] && (group.current.children[1].position.y = 0.71 + other)
  })

  return (
    <group ref={group}>
      <mesh position={[-0.05, 0.71, 0]} scale={[0.026, 0.016, 0.032]} material={skinMat} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
      </mesh>
      <mesh position={[0.05, 0.71, 0]} scale={[0.026, 0.016, 0.032]} material={skinMat} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
      </mesh>
    </group>
  )
}
