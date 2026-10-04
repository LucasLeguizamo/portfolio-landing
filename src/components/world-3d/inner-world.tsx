"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Group } from "three"

import { FallingCharacter } from "@/components/world-3d/character"
import { palette } from "@/components/world-3d/palette"

function Polaroid({
  position,
  color,
}: {
  position: [number, number, number]
  color: string
}) {
  return (
    <group position={position} rotation={[0.4, 0.6, 0.2]}>
      <mesh>
        <boxGeometry args={[0.42, 0.5, 0.02]} />
        <meshStandardMaterial color="#fffaf1" />
      </mesh>
      <mesh position={[0, 0.04, 0.012]}>
        <planeGeometry args={[0.34, 0.34]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

export function InnerWorld({ visible }: { visible: number }) {
  const swirl = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!swirl.current) return
    swirl.current.rotation.y += delta * 0.35
    swirl.current.rotation.z += delta * 0.12
  })

  if (visible < 0.04) return null

  return (
    <group position={[0.2, 0.4, 0.15]} scale={0.2 + visible * 0.8}>
      <group ref={swirl}>
        <mesh>
          <torusGeometry args={[1.6, 0.18, 16, 80]} />
          <meshStandardMaterial
            color="#f8c3d4"
            emissive="#f8c3d4"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh rotation={[0.6, 0.4, 0.2]}>
          <torusGeometry args={[1.15, 0.14, 16, 80]} />
          <meshStandardMaterial
            color="#c8f0e6"
            emissive="#c8f0e6"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh rotation={[1.1, -0.3, 0.5]}>
          <torusGeometry args={[0.75, 0.1, 16, 70]} />
          <meshStandardMaterial
            color={palette.yellowSoft}
            emissive={palette.yellow}
            emissiveIntensity={0.35}
          />
        </mesh>
        <Polaroid position={[1.1, 0.4, 0.3]} color="#f3d48a" />
        <Polaroid position={[-0.9, -0.2, 0.6]} color="#e7b7c8" />
        <Polaroid position={[0.2, 0.9, -0.8]} color="#9ed9cf" />
      </group>
      <group position={[0, 0.1, 0]}>
        <FallingCharacter />
      </group>
    </group>
  )
}
