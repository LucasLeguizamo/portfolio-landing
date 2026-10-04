"use client"

import { RoundedBox } from "@react-three/drei"

import { useWallTexture, useWoodTexture } from "@/components/world-3d/materials"
import { palette } from "@/components/world-3d/palette"

function StrawHat({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0.15, 0.2, 0.08]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
        <meshStandardMaterial color="#f3efe6" roughness={0.82} />
      </mesh>
      {Array.from({ length: 10 }).map((_, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <torusGeometry args={[0.06 + index * 0.014, 0.004, 8, 40]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#1b1b1b" : "#f3efe6"} />
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.09, 24]} />
        <meshStandardMaterial color="#f3efe6" roughness={0.8} />
      </mesh>
    </group>
  )
}

function PinkHat({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0.2, -0.25, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.018, 28]} />
        <meshStandardMaterial color="#f3b7c6" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.1, 24, 18, 0, Math.PI * 2, 0, 1.4]} />
        <meshStandardMaterial color="#f4c0cd" roughness={0.5} />
      </mesh>
    </group>
  )
}

function Leaf({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshPhysicalMaterial color="#67a85f" roughness={0.4} />
    </mesh>
  )
}

function Pothos({
  position,
  points,
}: {
  position: [number, number, number]
  points: Array<[number, number, number]>
}) {
  return (
    <group position={position}>
      {points.map((point, index) => (
        <Leaf
          key={index}
          position={point}
          rotation={[0.4 + index * 0.15, index * 0.4, 0.3]}
          scale={0.85 + (index % 3) * 0.12}
        />
      ))}
    </group>
  )
}

export function Room() {
  const wood = useWoodTexture()
  const wall = useWallTexture()

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color={palette.floor} roughness={0.9} />
      </mesh>
      <mesh position={[0.4, 0.01, 0.35]} rotation={[-Math.PI / 2, 0, 0.2]} receiveShadow>
        <circleGeometry args={[0.62, 48]} />
        <meshStandardMaterial color="#ead9b3" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.75, -1.28]} receiveShadow>
        <planeGeometry args={[12, 3.6]} />
        <meshStandardMaterial map={wall} color={palette.wall} roughness={0.92} />
      </mesh>
      <mesh position={[-3.4, 1.75, 0.6]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[6.4, 3.6]} />
        <meshStandardMaterial map={wall} color={palette.wall} roughness={0.92} />
      </mesh>

      <RoundedBox
        args={[2.25, 0.055, 0.78]}
        radius={0.012}
        position={[0.28, 0.74, -0.78]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={wood}
          color={palette.wood}
          roughness={0.42}
          metalness={0.02}
        />
      </RoundedBox>

      <group position={[0.48, 0, 0.22]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.09, 0.16, 0.44, 28]} />
          <meshPhysicalMaterial color={palette.chair} roughness={0.35} clearcoat={0.25} />
        </mesh>
        <mesh position={[0, 0.46, 0.02]} rotation={[0.08, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.045, 32]} />
          <meshPhysicalMaterial color={palette.chair} roughness={0.32} clearcoat={0.3} />
        </mesh>
        <mesh position={[0, 0.68, -0.12]} rotation={[0.42, 0, 0]}>
          <boxGeometry args={[0.34, 0.28, 0.04]} />
          <meshPhysicalMaterial color={palette.chair} roughness={0.32} clearcoat={0.25} />
        </mesh>
      </group>

      <group position={[0.05, 0.77, -0.72]}>
        <RoundedBox args={[0.56, 0.012, 0.36]} radius={0.006} position={[0, 0, 0.04]}>
          <meshPhysicalMaterial
            color={palette.silver}
            metalness={0.65}
            roughness={0.22}
          />
        </RoundedBox>
        <group position={[0, 0.19, -0.12]} rotation={[-0.16, 0, 0]}>
          <RoundedBox args={[0.54, 0.34, 0.012]} radius={0.008} castShadow>
            <meshPhysicalMaterial
              color={palette.silverDark}
              metalness={0.55}
              roughness={0.2}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.008]}>
            <planeGeometry args={[0.5, 0.3]} />
            <meshStandardMaterial
              color="#111111"
              emissive="#f5c400"
              emissiveIntensity={0.22}
            />
          </mesh>
        </group>
      </group>

      <group position={[-0.62, 0.8, -0.62]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.042, 0.075, 20]} />
          <meshStandardMaterial color="#f7f3ee" />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.048, 0.006, 8, 20]} />
          <meshStandardMaterial color="#7eb6c9" />
        </mesh>
      </group>
      <mesh position={[-0.88, 0.82, -0.66]}>
        <cylinderGeometry args={[0.032, 0.032, 0.11, 14]} />
        <meshStandardMaterial color="#f7f3ee" />
      </mesh>
      <RoundedBox args={[0.16, 0.015, 0.11]} radius={0.004} position={[-0.42, 0.775, -0.55]}>
        <meshStandardMaterial color="#f3efe8" />
      </RoundedBox>

      <RoundedBox args={[1.85, 0.04, 0.16]} radius={0.008} position={[0.15, 2.28, -1.2]}>
        <meshStandardMaterial map={wood} color={palette.wood} roughness={0.45} />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.16, 0.04]} radius={0.004} position={[-0.55, 2.4, -1.18]}>
        <meshStandardMaterial color="#d9c29a" />
      </RoundedBox>
      <RoundedBox args={[0.1, 0.13, 0.03]} radius={0.003} position={[-0.42, 2.38, -1.18]}>
        <meshStandardMaterial color="#eee6d6" />
      </RoundedBox>
      <mesh position={[0.95, 2.38, -1.16]}>
        <cylinderGeometry args={[0.018, 0.018, 0.12, 10]} />
        <meshStandardMaterial color="#f7f3ee" />
      </mesh>
      <StrawHat position={[0.2, 2.2, -1.16]} />
      <PinkHat position={[0.62, 2.2, -1.15]} />

      <mesh position={[-0.95, 1.72, -1.265]} rotation={[0, 0, 0.18]}>
        <planeGeometry args={[0.13, 0.16]} />
        <meshStandardMaterial color="#ffe27a" />
      </mesh>
      <mesh position={[-0.72, 1.48, -1.265]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[0.11, 0.14]} />
        <meshStandardMaterial color="#f8c3d4" />
      </mesh>
      <mesh position={[1.15, 1.62, -1.265]} rotation={[0, 0, 0.08]}>
        <planeGeometry args={[0.1, 0.12]} />
        <meshStandardMaterial color="#c8f0e6" />
      </mesh>
      <mesh position={[-0.58, 1.82, -1.265]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#f4b4c4" />
      </mesh>

      <group position={[1.28, 1.55, -1.05]}>
        <mesh>
          <cylinderGeometry args={[0.015, 0.04, 0.28, 12]} />
          <meshStandardMaterial color="#f4efe6" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#fff7ea" />
        </mesh>
      </group>

      <Pothos
        position={[-1.15, 2.55, -0.85]}
        points={[
          [0, 0, 0],
          [0.08, -0.18, 0.06],
          [-0.04, -0.34, 0.1],
          [0.1, -0.52, 0.14],
          [0.02, -0.7, 0.1],
          [0.16, -0.88, 0.16],
          [0.06, -1.08, 0.12],
        ]}
      />
      <Pothos
        position={[1.45, 2.5, -0.7]}
        points={[
          [0, 0, 0],
          [-0.1, -0.2, 0.08],
          [0.06, -0.4, 0.12],
          [-0.04, -0.62, 0.1],
          [0.08, -0.82, 0.14],
        ]}
      />
    </group>
  )
}
