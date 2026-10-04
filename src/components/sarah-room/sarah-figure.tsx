"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { CatmullRomCurve3, CapsuleGeometry, MeshStandardMaterial, Quaternion, TubeGeometry, Vector3, type Group, type Material } from "three"

import { blouseMat, frameMat, glassMat, hairMat, jeanMat, lipMat, skinMat } from "@/components/sarah-room/materials"
import { sceneBridge } from "@/components/sarah-room/scene-bridge"

const Y_AXIS = new Vector3(0, 1, 0)

function useBone(from: readonly [number, number, number], to: readonly [number, number, number], radius: number) {
  return useMemo(() => {
    const a = new Vector3(...from)
    const b = new Vector3(...to)
    const len = a.distanceTo(b)
    const mid = a.clone().add(b).multiplyScalar(0.5)
    const dir = b.clone().sub(a).normalize()
    const q = new Quaternion().setFromUnitVectors(Y_AXIS, dir)
    const shaft = Math.max(0.001, len - radius * 2)
    const geo = new CapsuleGeometry(radius, shaft, 6, 16)
    return { mid, q, geo }
  }, [from, to, radius])
}

function Limb({
  from,
  to,
  radius,
  material,
}: {
  from: readonly [number, number, number]
  to: readonly [number, number, number]
  radius: number
  material: Material
}) {
  const bone = useBone(from, to, radius)
  return (
    <mesh
      geometry={bone.geo}
      material={material}
      position={bone.mid}
      quaternion={bone.q}
      castShadow
    />
  )
}

const HIP_L = [-0.09, 0.4, 0.03] as const
const HIP_R = [0.09, 0.4, 0.03] as const
const KNEE_L = [-0.11, 0.24, 0.19] as const
const KNEE_R = [0.11, 0.24, 0.19] as const
const ANKLE_L = [-0.11, 0.045, 0.21] as const
const ANKLE_R = [0.11, 0.045, 0.21] as const
const SHOULDER_L = [-0.15, 0.64, 0.04] as const
const SHOULDER_R = [0.15, 0.64, 0.04] as const
const ELBOW_L = [-0.16, 0.52, 0.16] as const
const ELBOW_R = [0.16, 0.52, 0.16] as const
const HAND_L = [-0.05, 0.71, 0.3] as const
const HAND_R = [0.05, 0.71, 0.3] as const
const eyeWhite = new MeshStandardMaterial({ color: "#f7f4ef", roughness: 0.28 })
const irisMat = new MeshStandardMaterial({ color: "#4a3428", roughness: 0.35 })
const pupilMat = new MeshStandardMaterial({ color: "#140e0c", roughness: 0.2 })

function useHairTube() {
  return useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0, 0.04, -0.02),
      new Vector3(0, -0.06, -0.07),
      new Vector3(0, -0.16, -0.05),
      new Vector3(0.01, -0.28, -0.02),
    ])
    return new TubeGeometry(curve, 24, 0.042, 10, false)
  }, [])
}

export function SarahFigure() {
  const head = useRef<Group>(null)
  const hair = useRef<Group>(null)
  const lids = useRef<Group>(null)
  const hairTube = useHairTube()

  useFrame(() => {
    const params = sceneBridge.params
    if (!params || !head.current) return
    head.current.rotation.order = "YXZ"
    head.current.rotation.y = -params.head[0]
    head.current.rotation.x = params.head[1]
    if (hair.current) hair.current.rotation.z = params.hair[0] * 0.35
    if (lids.current) lids.current.position.y = -0.012 * params.head[2]
  })

  return (
    <group>
      <mesh position={[0, 0.56, 0.045]} scale={[0.16, 0.2, 0.11]} castShadow material={blouseMat}>
        <sphereGeometry args={[1, 32, 24]} />
      </mesh>
      <mesh position={[0, 0.42, 0.03]} scale={[0.15, 0.08, 0.11]} castShadow material={blouseMat}>
        <sphereGeometry args={[1, 24, 16]} />
      </mesh>
      <mesh position={[0, 0.7, 0.04]} material={skinMat} castShadow>
        <capsuleGeometry args={[0.028, 0.06, 4, 12]} />
      </mesh>

      <Limb from={HIP_L} to={KNEE_L} radius={0.048} material={jeanMat} />
      <Limb from={HIP_R} to={KNEE_R} radius={0.048} material={jeanMat} />
      <Limb from={KNEE_L} to={ANKLE_L} radius={0.036} material={jeanMat} />
      <Limb from={KNEE_R} to={ANKLE_R} radius={0.036} material={jeanMat} />
      <mesh position={[-0.1, 0.03, 0.25]} scale={[0.034, 0.016, 0.06]} material={skinMat} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
      </mesh>
      <mesh position={[0.1, 0.03, 0.25]} scale={[0.034, 0.016, 0.06]} material={skinMat} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
      </mesh>

      <Limb from={SHOULDER_L} to={ELBOW_L} radius={0.032} material={blouseMat} />
      <Limb from={SHOULDER_R} to={ELBOW_R} radius={0.032} material={blouseMat} />
      <Limb from={ELBOW_L} to={HAND_L} radius={0.024} material={skinMat} />
      <Limb from={ELBOW_R} to={HAND_R} radius={0.024} material={skinMat} />
      <mesh position={HAND_L} scale={[0.026, 0.016, 0.032]} material={skinMat} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
      </mesh>
      <mesh position={HAND_R} scale={[0.026, 0.016, 0.032]} material={skinMat} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
      </mesh>

      <mesh position={[0, 0.7, 0.07]} rotation={[Math.PI / 2, 0, 0]} material={frameMat}>
        <torusGeometry args={[0.055, 0.004, 8, 24]} />
      </mesh>

      <group ref={head} position={[0, 0.835, 0.05]}>
        <mesh material={skinMat} castShadow scale={[0.9, 1.12, 0.92]}>
          <sphereGeometry args={[0.058, 40, 32]} />
        </mesh>
        <mesh position={[0, -0.045, 0.012]} scale={[0.72, 0.55, 0.7]} material={skinMat} castShadow>
          <sphereGeometry args={[0.04, 24, 16]} />
        </mesh>
        <mesh position={[-0.052, -0.004, 0]} scale={[0.7, 1, 0.55]} material={skinMat}>
          <sphereGeometry args={[0.016, 12, 10]} />
        </mesh>
        <mesh position={[0.052, -0.004, 0]} scale={[0.7, 1, 0.55]} material={skinMat}>
          <sphereGeometry args={[0.016, 12, 10]} />
        </mesh>
        <mesh position={[0, -0.008, 0.05]} rotation={[1.1, 0, 0]} material={skinMat}>
          <capsuleGeometry args={[0.006, 0.012, 3, 8]} />
        </mesh>
        <mesh position={[0, -0.046, 0.048]} scale={[1.3, 0.45, 0.4]} material={lipMat}>
          <sphereGeometry args={[0.01, 16, 10]} />
        </mesh>

        {([-1, 1] as const).map((side) => (
          <group key={side} position={[side * 0.02, 0.012, 0.046]}>
            <mesh material={eyeWhite} scale={[1, 0.72, 0.45]}>
              <sphereGeometry args={[0.012, 16, 12]} />
            </mesh>
            <mesh position={[0, 0, 0.006]} material={irisMat}>
              <sphereGeometry args={[0.0062, 16, 12]} />
            </mesh>
            <mesh position={[0, 0, 0.01]} material={pupilMat}>
              <sphereGeometry args={[0.003, 12, 8]} />
            </mesh>
            <mesh position={[side * 0.004, 0.016, 0.002]} rotation={[0, 0, side * -0.3]} material={hairMat}>
              <capsuleGeometry args={[0.002, 0.014, 2, 6]} />
            </mesh>
          </group>
        ))}

        <group ref={lids}>
          {([-1, 1] as const).map((side) => (
            <mesh key={side} position={[side * 0.02, 0.02, 0.05]} material={skinMat}>
              <boxGeometry args={[0.022, 0.006, 0.008]} />
            </mesh>
          ))}
        </group>

        {([-1, 1] as const).map((side) => (
          <group key={`g${side}`}>
            <mesh position={[side * 0.02, 0.01, 0.055]} material={frameMat}>
              <boxGeometry args={[0.03, 0.02, 0.003]} />
            </mesh>
            <mesh position={[side * 0.02, 0.01, 0.056]} material={glassMat}>
              <boxGeometry args={[0.024, 0.014, 0.002]} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.01, 0.055]} material={frameMat}>
          <boxGeometry args={[0.01, 0.003, 0.003]} />
        </mesh>
        <mesh position={[-0.038, 0.008, 0.02]} rotation={[0.1, 0.4, 0.1]} material={frameMat}>
          <boxGeometry args={[0.028, 0.003, 0.003]} />
        </mesh>
        <mesh position={[0.038, 0.008, 0.02]} rotation={[0.1, -0.4, -0.1]} material={frameMat}>
          <boxGeometry args={[0.028, 0.003, 0.003]} />
        </mesh>

        <group ref={hair}>
          <mesh material={hairMat} castShadow position={[0, 0.02, -0.012]}>
            <sphereGeometry args={[0.066, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
          </mesh>
          <mesh geometry={hairTube} material={hairMat} castShadow />
          <mesh position={[-0.04, -0.08, 0.01]} rotation={[0.2, 0, 0.35]} material={hairMat} castShadow>
            <capsuleGeometry args={[0.012, 0.12, 4, 8]} />
          </mesh>
          <mesh position={[0.04, -0.07, 0.012]} rotation={[0.15, 0, -0.3]} material={hairMat} castShadow>
            <capsuleGeometry args={[0.011, 0.11, 4, 8]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
