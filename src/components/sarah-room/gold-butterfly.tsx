"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, type Mesh } from "three"

import { butterflyMat } from "@/components/sarah-room/materials"
import { sceneBridge } from "@/components/sarah-room/scene-bridge"

export function GoldButterfly() {
  const group = useRef<Group>(null)
  const left = useRef<Mesh>(null)
  const right = useRef<Mesh>(null)
  const prev = useRef<[number, number, number]>([-0.48, 0.93, 0.28])

  useFrame(() => {
    const params = sceneBridge.params
    if (!params || !group.current || !left.current || !right.current) return
    const [x, y, z, flap] = params.fly
    group.current.position.set(x, y, z)
    const [px, py, pz] = prev.current
    const dx = x - px
    const dz = z - pz
    if (Math.hypot(dx, y - py, dz) > 0.0004) {
      group.current.rotation.y = Math.atan2(dx, dz)
    }
    prev.current = [x, y, z]
    const angle = 0.4 + flap * 0.9
    left.current.rotation.y = angle
    right.current.rotation.y = -angle
  })

  return (
    <group ref={group}>
      <mesh material={butterflyMat} castShadow>
        <capsuleGeometry args={[0.006, 0.028, 3, 6]} />
      </mesh>
      <mesh ref={left} position={[-0.045, 0.004, 0]} scale={[0.09, 0.055, 0.01]} material={butterflyMat} castShadow>
        <sphereGeometry args={[1, 16, 10]} />
      </mesh>
      <mesh ref={right} position={[0.045, 0.004, 0]} scale={[0.09, 0.055, 0.01]} material={butterflyMat} castShadow>
        <sphereGeometry args={[1, 16, 10]} />
      </mesh>
    </group>
  )
}
