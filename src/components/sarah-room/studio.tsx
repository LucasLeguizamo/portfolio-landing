"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import {
  BackSide,
  CanvasTexture,
  ExtrudeGeometry,
  LatheGeometry,
  MeshStandardMaterial,
  ShaderMaterial,
  Shape,
  Vector2,
  type Mesh,
} from "three"

import {
  brassMat,
  ceramicMat,
  chairMat,
  curtainMat,
  floorMat,
  leafMat,
  potMat,
  rugMat,
  silverMat,
  woodDarkMat,
  woodMat,
} from "@/components/sarah-room/materials"
import { sceneBridge } from "@/components/sarah-room/scene-bridge"

function useLeaf(scale = 1) {
  return useMemo(() => {
    const shape = new Shape()
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.22, 0.08, 0.2, 0.42, 0, 0.7)
    shape.bezierCurveTo(-0.2, 0.42, -0.22, 0.08, 0, 0)
    const cut = new Shape()
    cut.moveTo(0.02, 0.28)
    cut.bezierCurveTo(0.06, 0.32, 0.05, 0.4, 0.01, 0.44)
    cut.bezierCurveTo(-0.02, 0.4, -0.01, 0.32, 0.02, 0.28)
    shape.holes.push(cut)
    const geo = new ExtrudeGeometry(shape, {
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.004,
      bevelSegments: 1,
      curveSegments: 10,
    })
    geo.scale(scale, scale, scale)
    geo.translate(0, 0, -0.006 * scale)
    geo.computeVertexNormals()
    return geo
  }, [scale])
}

function usePot(scale = 1) {
  return useMemo(() => {
    const pts = [
      new Vector2(0.02 * scale, 0),
      new Vector2(0.055 * scale, 0.01 * scale),
      new Vector2(0.048 * scale, 0.09 * scale),
      new Vector2(0.06 * scale, 0.105 * scale),
    ]
    return new LatheGeometry(pts, 28)
  }, [scale])
}

function Plant({
  position,
  scale = 1,
  trail = false,
}: {
  position: [number, number, number]
  scale?: number
  trail?: boolean
}) {
  const leaf = useLeaf(0.22 * scale)
  const pot = usePot(scale)
  return (
    <group position={position}>
      <mesh geometry={pot} material={potMat} castShadow receiveShadow />
      <mesh position={[0, 0.1 * scale, 0]} material={leafMat} castShadow>
        <cylinderGeometry args={[0.008 * scale, 0.01 * scale, 0.16 * scale, 8]} />
      </mesh>
      <mesh position={[0, 0.2 * scale, 0]} material={leafMat} geometry={leaf} rotation={[0.4, 0.2, 0.1]} castShadow />
      <mesh position={[0.06 * scale, 0.2 * scale, 0.02 * scale]} material={leafMat} geometry={leaf} rotation={[0.2, 1.2, -0.4]} castShadow />
      <mesh position={[-0.05 * scale, 0.18 * scale, -0.02 * scale]} material={leafMat} geometry={leaf} rotation={[-0.3, -0.8, 0.5]} castShadow />
      <mesh position={[0.01 * scale, 0.26 * scale, -0.03 * scale]} material={leafMat} geometry={leaf} rotation={[-0.8, 0.4, 0]} castShadow />
      {trail && (
        <mesh position={[0.08 * scale, 0.08 * scale, 0.06 * scale]} material={leafMat} geometry={leaf} rotation={[1.2, 0.6, 0.4]} />
      )}
    </group>
  )
}

function screenTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 320
  const g = canvas.getContext("2d")
  if (!g) return new CanvasTexture(canvas)
  g.fillStyle = "#f7f1e6"
  g.fillRect(0, 0, 512, 320)
  const blobs: Array<[number, number, string]> = [
    [80, 220, "rgba(244,186,156,0.55)"],
    [400, 60, "rgba(164,214,214,0.45)"],
    [260, 160, "rgba(245,196,0,0.28)"],
  ]
  for (const [x, y, color] of blobs) {
    const grd = g.createRadialGradient(x, y, 10, x, y, 140)
    grd.addColorStop(0, color)
    grd.addColorStop(1, "rgba(255,255,255,0)")
    g.fillStyle = grd
    g.fillRect(0, 0, 512, 320)
  }
  const folders = ["#f0a3b5", "#8aa4c8", "#f0d56a", "#9cba9a", "#b7a8c9"]
  folders.forEach((color, i) => {
    const x = 70 + (i % 5) * 78
    const y = 150
    g.fillStyle = color
    g.beginPath()
    g.roundRect(x, y, 58, 44, 8)
    g.fill()
  })
  const tex = new CanvasTexture(canvas)
  tex.colorSpace = "srgb"
  tex.needsUpdate = true
  return tex
}

function Laptop() {
  const screen = useRef<Mesh>(null)
  const map = useMemo(() => screenTexture(), [])
  const mat = useMemo(
    () =>
      new MeshStandardMaterial({
        map,
        emissive: "#ffbf3c",
        emissiveMap: map,
        emissiveIntensity: 0.25,
        roughness: 0.4,
      }),
    [map],
  )

  useFrame(() => {
    const glow = sceneBridge.params?.glow[0] ?? 0
    const material = screen.current?.material
    if (material && !Array.isArray(material) && "emissiveIntensity" in material) {
      material.emissiveIntensity = 0.2 + glow * 1.6
    }
  })

  return (
    <group position={[0.1, 0.712, 0.3]}>
      <mesh castShadow receiveShadow material={silverMat} position={[0, 0, 0]}>
        <boxGeometry args={[0.26, 0.014, 0.18]} />
      </mesh>
      <mesh position={[0, 0.01, 0.01]} material={woodDarkMat}>
        <boxGeometry args={[0.2, 0.004, 0.09]} />
      </mesh>
      <group position={[0, 0.006, 0.09]} rotation={[-1.05, 0, 0]}>
        <mesh castShadow material={silverMat} position={[0, 0.078, 0]}>
          <boxGeometry args={[0.25, 0.156, 0.008]} />
        </mesh>
        <mesh ref={screen} material={mat} position={[0, 0.078, -0.006]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.22, 0.13]} />
        </mesh>
      </group>
    </group>
  )
}

function Chair() {
  return (
    <group position={[0, 0, -0.02]}>
      <mesh position={[0, 0.36, 0]} material={chairMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.06, 24]} />
      </mesh>
      <mesh position={[0, 0.56, -0.14]} material={chairMat} castShadow>
        <boxGeometry args={[0.28, 0.32, 0.04]} />
      </mesh>
      <mesh position={[0, 0.2, 0]} material={silverMat}>
        <cylinderGeometry args={[0.018, 0.018, 0.28, 10]} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2
        const x = Math.cos(a) * 0.16
        const z = Math.sin(a) * 0.16
        return (
          <group key={i}>
            <mesh position={[x / 2, 0.06, z / 2]} rotation={[0, -a, Math.PI / 2]} material={silverMat}>
              <cylinderGeometry args={[0.01, 0.01, 0.16, 8]} />
            </mesh>
            <mesh position={[x, 0.035, z]} material={woodDarkMat}>
              <sphereGeometry args={[0.016, 10, 8]} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function WindowWall() {
  return (
    <group position={[-1.15, 0.95, 0.28]}>
      <mesh material={woodMat} castShadow>
        <boxGeometry args={[0.06, 0.86, 0.66]} />
      </mesh>
      <mesh position={[0.02, 0.04, 0]} material={ceramicMat}>
        <boxGeometry args={[0.02, 0.68, 0.5]} />
      </mesh>
      <mesh position={[0.08, -0.05, -0.28]} material={curtainMat}>
        <boxGeometry args={[0.04, 0.9, 0.12]} />
      </mesh>
      <mesh position={[0.08, -0.08, 0.28]} material={curtainMat}>
        <boxGeometry args={[0.04, 0.84, 0.1]} />
      </mesh>
    </group>
  )
}

function Cyclorama() {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        side: BackSide,
        depthWrite: false,
        vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `
          varying vec3 vPos;
          void main() {
            float h = clamp(vPos.y / 7.5 * 0.5 + 0.45, 0.0, 1.0);
            vec3 low = vec3(0.90, 0.74, 0.58);
            vec3 mid = vec3(0.97, 0.91, 0.84);
            vec3 high = vec3(0.99, 0.97, 0.94);
            vec3 col = mix(low, mix(mid, high, smoothstep(0.42, 0.85, h)), smoothstep(0.0, 0.38, h));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [],
  )
  return (
    <mesh material={mat} position={[0.1, 0.9, 0.15]} renderOrder={-1}>
      <sphereGeometry args={[8, 28, 20]} />
    </mesh>
  )
}

export function Studio() {
  return (
    <group>
      <Cyclorama />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.05, 0, 0.15]} material={floorMat} receiveShadow>
        <circleGeometry args={[3.2, 48]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.02, 0.004, 0.08]} material={rugMat} receiveShadow>
        <circleGeometry args={[0.7, 40]} />
      </mesh>

      <mesh position={[0.06, 0.7, 0.38]} material={woodMat} castShadow receiveShadow>
        <boxGeometry args={[1.12, 0.045, 0.48]} />
      </mesh>
      <mesh position={[-0.36, 0.36, 0.38]} material={woodDarkMat} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.62, 0.4]} />
      </mesh>
      {([-0.42, 0.54] as const).flatMap((x) =>
        ([0.18, 0.56] as const).map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.34, z]} material={woodMat} castShadow>
            <boxGeometry args={[0.04, 0.66, 0.04]} />
          </mesh>
        )),
      )}

      <Laptop />
      <Chair />
      <WindowWall />

      <group position={[0.46, 0.73, 0.22]}>
        <mesh material={brassMat} castShadow>
          <cylinderGeometry args={[0.04, 0.045, 0.02, 16]} />
        </mesh>
        <mesh position={[-0.08, 0.16, 0.02]} rotation={[0.4, 0, 0.7]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.28, 8]} />
        </mesh>
        <mesh position={[-0.16, 0.12, 0.05]} material={ceramicMat} castShadow>
          <sphereGeometry args={[0.05, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      <Plant position={[-0.46, 0.73, 0.5]} scale={0.85} />
      <Plant position={[0.5, 0.73, 0.48]} scale={0.62} trail />
      <Plant position={[0.42, 0.73, 0.16]} scale={0.38} />
      <Plant position={[-0.85, 0.02, 0.55]} scale={1.15} />

      <mesh position={[-0.18, 0.76, 0.26]} material={ceramicMat} castShadow>
        <cylinderGeometry args={[0.028, 0.024, 0.07, 16]} />
      </mesh>
      <group position={[-0.32, 0.74, 0.5]}>
        <mesh position={[0, 0, 0]} material={ceramicMat} castShadow>
          <boxGeometry args={[0.14, 0.02, 0.18]} />
        </mesh>
        <mesh position={[0.004, 0.02, 0.004]} material={rugMat}>
          <boxGeometry args={[0.13, 0.016, 0.16]} />
        </mesh>
        <mesh position={[0.008, 0.038, 0]} material={leafMat}>
          <boxGeometry args={[0.12, 0.014, 0.15]} />
        </mesh>
      </group>
      <mesh position={[-0.4, 0.76, 0.26]} rotation={[0.1, 0.2, 0]} material={woodMat} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.012, 20]} />
      </mesh>
      <mesh position={[-0.4, 0.79, 0.26]} material={ceramicMat} castShadow>
        <sphereGeometry args={[0.03, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </group>
  )
}
