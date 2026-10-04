"use client"

import { useMemo, useRef, type RefObject } from "react"
import { useFrame } from "@react-three/fiber"
import { CatmullRomCurve3, Group, Vector3 } from "three"

import { palette } from "@/components/world-3d/palette"

const curve = new CatmullRomCurve3([
  new Vector3(-2.6, 1.85, 2.4),
  new Vector3(-1.2, 2.15, 1.6),
  new Vector3(0.1, 2.05, 0.9),
  new Vector3(0.55, 1.55, 0.35),
  new Vector3(0.45, 1.2, -0.02),
])

function Wing({ side }: { side: -1 | 1 }) {
  return (
    <mesh position={[side * 0.045, 0, 0]} rotation={[0.2, side * 0.35, side * 0.15]}>
      <planeGeometry args={[0.16, 0.12]} />
      <meshStandardMaterial
        color={palette.yellow}
        emissive={palette.yellowSoft}
        emissiveIntensity={0.55}
        side={2}
        transparent
        opacity={0.95}
      />
    </mesh>
  )
}

type Butterfly3DProps = {
  progressRef: RefObject<number>
}

export function Butterfly3D({ progressRef }: Butterfly3DProps) {
  const group = useRef<Group>(null)
  const look = useMemo(() => new Vector3(), [])
  const tangent = useMemo(() => new Vector3(), [])

  useFrame((state) => {
    const t = Math.min(0.98, Math.max(0, progressRef.current * 1.05))
    const point = curve.getPointAt(t)
    tangent.copy(curve.getTangentAt(t))
    if (!group.current) return
    group.current.position.copy(point)
    look.copy(point).add(tangent)
    group.current.lookAt(look)
    const flap = 0.55 + Math.sin(state.clock.elapsedTime * 18) * 0.45
    group.current.scale.set(1, flap, 1)
  })

  return (
    <group ref={group}>
      <mesh>
        <cylinderGeometry args={[0.006, 0.006, 0.08, 6]} />
        <meshStandardMaterial color="#4a3318" />
      </mesh>
      <Wing side={-1} />
      <Wing side={1} />
      <pointLight color={palette.yellow} intensity={0.8} distance={1.4} />
    </group>
  )
}
