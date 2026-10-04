"use client"

import { RoundedBox, Sphere } from "@react-three/drei"

import { palette } from "@/components/world-3d/palette"

function Skin({ roughness = 0.42 }: { roughness?: number }) {
  return (
    <meshPhysicalMaterial
      color={palette.skin}
      roughness={roughness}
      sheen={0.35}
      sheenColor="#f0c2a4"
      clearcoat={0.08}
    />
  )
}

function Lock({
  position,
  rotation,
  args,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  args: [number, number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <capsuleGeometry args={args} />
      <meshStandardMaterial color={palette.hair} roughness={0.78} />
    </mesh>
  )
}

function Glasses() {
  return (
    <group position={[0, 1.318, 0.118]}>
      {([-1, 1] as const).map((side) => (
        <group key={side} position={[side * 0.046, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.036, 0.0036, 10, 28]} />
            <meshPhysicalMaterial
              color="#f6f1ea"
              roughness={0.15}
              metalness={0.15}
              clearcoat={0.6}
            />
          </mesh>
          <mesh>
            <circleGeometry args={[0.033, 24]} />
            <meshPhysicalMaterial
              color="#dce9f5"
              transmission={0.72}
              thickness={0.02}
              roughness={0.04}
              transparent
              opacity={0.22}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.004, 0.01]}>
        <boxGeometry args={[0.03, 0.004, 0.004]} />
        <meshStandardMaterial color="#f6f1ea" />
      </mesh>
      <mesh position={[-0.082, 0.002, -0.05]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[0.07, 0.004, 0.004]} />
        <meshStandardMaterial color="#f6f1ea" />
      </mesh>
      <mesh position={[0.082, 0.002, -0.05]} rotation={[0, -0.35, 0]}>
        <boxGeometry args={[0.07, 0.004, 0.004]} />
        <meshStandardMaterial color="#f6f1ea" />
      </mesh>
    </group>
  )
}

export function Character() {
  return (
    <group position={[0.48, 0.02, 0.2]} rotation={[0, 0.38, 0]} scale={0.58}>
      <group position={[0, 0.74, 0.02]} rotation={[0.04, -0.32, 0]}>
        <mesh position={[0, 1.3, 0]} scale={[0.9, 1.08, 0.86]} castShadow>
          <sphereGeometry args={[0.145, 48, 48]} />
          <Skin roughness={0.36} />
        </mesh>
        <Sphere args={[0.055, 24, 24]} position={[0, 1.17, 0.03]}>
          <Skin />
        </Sphere>
        <Sphere args={[0.05, 20, 20]} position={[-0.07, 1.28, 0.07]}>
          <meshPhysicalMaterial color={palette.skinDeep} roughness={0.4} />
        </Sphere>
        <Sphere args={[0.05, 20, 20]} position={[0.07, 1.28, 0.07]}>
          <meshPhysicalMaterial color={palette.skinDeep} roughness={0.4} />
        </Sphere>
        <mesh position={[0, 1.29, 0.125]} rotation={[0.2, 0, 0]}>
          <coneGeometry args={[0.016, 0.03, 10]} />
          <meshPhysicalMaterial color={palette.skinDeep} roughness={0.38} />
        </mesh>
        {([-1, 1] as const).map((side) => (
          <group key={side}>
            <Sphere args={[0.024, 16, 16]} position={[side * 0.044, 1.318, 0.11]}>
              <meshStandardMaterial color="#fbf7f2" />
            </Sphere>
            <Sphere args={[0.013, 16, 16]} position={[side * 0.044, 1.318, 0.128]}>
              <meshStandardMaterial color="#2b1c14" />
            </Sphere>
            <Sphere args={[0.004, 8, 8]} position={[side * 0.05, 1.324, 0.138]}>
              <meshStandardMaterial color="#fff" />
            </Sphere>
            <mesh position={[side * 0.046, 1.35, 0.11]} rotation={[0, 0, side * -0.08]}>
              <boxGeometry args={[0.038, 0.006, 0.008]} />
              <meshStandardMaterial color={palette.hair} />
            </mesh>
            <mesh position={[side * 0.13, 1.29, 0]} rotation={[0, side * 0.2, 0]}>
              <sphereGeometry args={[0.028, 16, 16]} />
              <Skin />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 1.236, 0.12]} rotation={[0.4, 0, 0]} scale={[1, 0.45, 0.7]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshPhysicalMaterial color={palette.lip} roughness={0.3} />
        </mesh>
        <Glasses />

        <Sphere args={[0.17, 32, 32]} position={[0, 1.38, -0.02]} castShadow>
          <meshStandardMaterial color={palette.hair} roughness={0.76} />
        </Sphere>
        <Sphere args={[0.12, 24, 24]} position={[-0.1, 1.36, 0.05]}>
          <meshStandardMaterial color={palette.hairHi} roughness={0.74} />
        </Sphere>
        <Sphere args={[0.11, 24, 24]} position={[0.11, 1.35, 0.04]}>
          <meshStandardMaterial color={palette.hairHi} roughness={0.74} />
        </Sphere>
        <Lock position={[-0.12, 1.16, -0.02]} rotation={[0.35, 0.2, 0.35]} args={[0.04, 0.22, 8, 16]} />
        <Lock position={[0.1, 1.14, 0]} rotation={[0.45, -0.15, -0.25]} args={[0.038, 0.24, 8, 16]} />
        <Lock position={[-0.08, 1.08, -0.08]} rotation={[0.7, 0.1, 0.1]} args={[0.042, 0.28, 8, 16]} />
        <Lock position={[0.07, 1.06, -0.1]} rotation={[0.75, -0.1, -0.05]} args={[0.04, 0.3, 8, 16]} />
        <Lock position={[0.02, 1.18, -0.12]} rotation={[1.05, 0, 0]} args={[0.05, 0.22, 8, 16]} />
        <Lock position={[-0.14, 1.22, 0.06]} rotation={[0.15, 0.4, 0.6]} args={[0.034, 0.18, 8, 16]} />

        <mesh position={[0, 1.12, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.062, 0.1, 16]} />
          <Skin />
        </mesh>
        <RoundedBox
          args={[0.3, 0.38, 0.18]}
          radius={0.07}
          smoothness={6}
          position={[0, 0.88, 0.01]}
          castShadow
        >
          <meshPhysicalMaterial color={palette.top} roughness={0.48} sheen={0.2} />
        </RoundedBox>
      </group>

      <group position={[-0.16, 1.58, 0.08]} rotation={[0.55, 0.15, 1.15]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.038, 0.22, 8, 16]} />
          <Skin />
        </mesh>
        <mesh position={[0.02, -0.2, 0.16]} rotation={[-1.15, 0, 0.1]} castShadow>
          <capsuleGeometry args={[0.032, 0.2, 8, 16]} />
          <Skin />
        </mesh>
        <mesh position={[0.03, -0.22, 0.32]} rotation={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.038, 16, 16]} />
          <Skin roughness={0.38} />
        </mesh>
      </group>

      <group position={[0.2, 1.52, 0.04]} rotation={[1.15, 0, -0.35]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.038, 0.2, 8, 16]} />
          <Skin />
        </mesh>
        <mesh position={[0, -0.18, 0.08]} rotation={[-0.7, 0, 0]}>
          <capsuleGeometry args={[0.032, 0.18, 8, 16]} />
          <Skin />
        </mesh>
      </group>

      <group position={[-0.08, 1.12, 0.1]} rotation={[1.32, 0.08, 0.12]}>
        <RoundedBox args={[0.12, 0.4, 0.14]} radius={0.05} smoothness={5} castShadow>
          <meshStandardMaterial color={palette.jeans} roughness={0.58} />
        </RoundedBox>
      </group>
      <group position={[0.1, 1.12, 0.1]} rotation={[1.32, -0.04, -0.06]}>
        <RoundedBox args={[0.12, 0.4, 0.14]} radius={0.05} smoothness={5} castShadow>
          <meshStandardMaterial color={palette.jeansHi} roughness={0.58} />
        </RoundedBox>
      </group>
      <group position={[-0.1, 0.88, 0.42]}>
        <RoundedBox args={[0.11, 0.4, 0.13]} radius={0.045} smoothness={5} castShadow>
          <meshStandardMaterial color={palette.jeans} roughness={0.6} />
        </RoundedBox>
        <mesh position={[0.01, -0.22, 0.05]} rotation={[0.1, 0, 0.15]}>
          <boxGeometry args={[0.17, 0.05, 0.08]} />
          <meshStandardMaterial color={palette.skin} roughness={0.4} />
        </mesh>
        <mesh position={[0.01, -0.18, 0.05]} rotation={[1.57, 0, 0]}>
          <torusGeometry args={[0.035, 0.004, 8, 20]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.25} />
        </mesh>
      </group>
      <group position={[0.12, 0.88, 0.42]}>
        <RoundedBox args={[0.11, 0.4, 0.13]} radius={0.045} smoothness={5} castShadow>
          <meshStandardMaterial color={palette.jeansHi} roughness={0.6} />
        </RoundedBox>
        <mesh position={[0.01, -0.22, 0.05]} rotation={[0.1, 0, -0.1]}>
          <boxGeometry args={[0.17, 0.05, 0.08]} />
          <meshStandardMaterial color={palette.skin} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}

export function FallingCharacter() {
  return (
    <group rotation={[2.7, 0.35, 0.15]} scale={0.85}>
      <Character />
    </group>
  )
}
