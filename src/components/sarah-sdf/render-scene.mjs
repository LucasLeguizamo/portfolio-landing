// Four room plates for the scene pass. Run from this folder:
//   NODE_PATH=/tmp/sarah-harness/node_modules node --experimental-strip-types render-scene.mjs /tmp/sarah-scene
import { mkdirSync, writeFileSync } from "node:fs"
import { PNG } from "pngjs"
import { effect, init, target } from "vgpu/node"
import { SARAH_WGSL } from "./sarah-shader.ts"
import { createSarahMotion, stepSarahMotion } from "./sarah-motion.ts"

const out = process.argv[2] ?? "/tmp/sarah-scene"
mkdirSync(out, { recursive: true })
const size = [720, 900]
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
  console.log("wrote", name)
}

await shot("idle-header", { ...m.params, res: size })
await shot("room-wide", {
  ...m.params,
  cam: [0.95, 0.18, 2.15, 1.05],
  aim: [0.02, 0.62, 0.22, 0],
  fly: [-2, 2, -2, 0],
})
for (let i = 0; i < 90; i++) stepSarahMotion(m, 1 / 30, 0.55)
await shot("over-shoulder", { ...m.params, res: size })
for (let i = 0; i < 90; i++) stepSarahMotion(m, 1 / 30, 1)
await shot("finale-screen", { ...m.params, res: size })
gpu.dispose()
console.log("ok", out)
