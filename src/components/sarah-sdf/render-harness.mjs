// Headless judge harness for Sarah.
//
//   cd /tmp/sarah-harness && pnpm add vgpu pngjs
//   pnpm exec vgpu doctor
//   node /workspace/src/components/sarah-sdf/render-harness.mjs out
import { mkdirSync, writeFileSync } from "node:fs"
import { PNG } from "pngjs"
import { effect, init, target } from "vgpu/node"
import { SARAH_WGSL } from "./sarah-shader.ts"
import { CANVAS_H, CANVAS_W, createSarahMotion, stepSarahMotion } from "./sarah-motion.ts"

const out = process.argv[2] ?? "harness-out"
mkdirSync(out, { recursive: true })
const SCALE = 1
const size = [CANVAS_W * SCALE, CANVAS_H * SCALE]

const gpu = await init()
const rt = target(gpu, { size })
const m = createSarahMotion()
const fx = effect(gpu, SARAH_WGSL, { set: { params: { ...m.params, res: size } } })

async function shot(name, params) {
  fx.set({ params: { ...params, res: size } })
  fx.draw(rt)
  const pixels = await rt.color.read({ mipLevel: 0, region: "all" })
  const png = new PNG({ width: size[0], height: size[1] })
  for (let i = 0; i < pixels.length; i += 4) {
    const a = pixels[i + 3] / 255
    for (let c = 0; c < 3; c++) png.data[i + c] = Math.round(pixels[i + c] + 255 * (1 - a))
    png.data[i + 3] = 255
  }
  writeFileSync(`${out}/${name}.png`, PNG.sync.write(png))
}

// standing-style turnaround of the seated scene at the reference angles
for (const deg of [0, 45, 90, 135, 180, 225, 270, 315]) {
  await shot(`turn-${deg}`, {
    ...m.params,
    cam: [(deg * Math.PI) / 180, 0.08, 2.6, 1],
    fly: [-2, 2, -2, 0],
    glow: [0, 0, 0, 0],
  })
}

// close face plate for the fidelity judge
await shot("face-idle", {
  ...m.params,
  cam: [0.22, 0.02, 0.88, 2.55],
  aim: [0.0, 0.83, 0.05, 0],
  fly: [-2, 2, -2, 0],
  glow: [0, 0, 0, 0],
})
await shot("face-profile", {
  ...m.params,
  cam: [1.45, 0.04, 0.7, 2.3],
  aim: [0.0, 0.82, 0.05, 0],
  fly: [-2, 2, -2, 0],
  glow: [0, 0, 0, 0],
})

const rows = ["t,progress,headYaw,camYaw,flyX,flyY,glow"]
for (let i = 0; i <= 120; i++) {
  const progress = i / 120
  stepSarahMotion(m, 1 / 30, progress)
  rows.push(
    [i / 30, m.progress, m.headYaw.x, m.camYaw.x, m.flyX.x, m.flyY.x, m.params.glow[0]]
      .map((v) => v.toFixed(4))
      .join(","),
  )
  if (i % 15 === 0) await shot(`beat-${String(i).padStart(3, "0")}`, m.params)
}
writeFileSync(`${out}/curves.csv`, rows.join("\n"))
gpu.dispose()
console.log(`wrote ${out}/`)
