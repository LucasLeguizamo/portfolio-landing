import assert from "node:assert/strict"
import * as motion from "./sarah-motion.ts"
import * as shader from "./sarah-shader.ts"

const { createSarahMotion, stepSarahMotion, butterflyAt, sequenceTargets } = motion
assert.equal(motion.SIT_HIP_Y, shader.SIT_HIP_Y, "shader and sim share sit hip height")
assert.equal(motion.HEAD_R, shader.HEAD_R, "shader and sim share head radius")

const m = createSarahMotion()
const yaws = []
const glows = []
let maxHeadJerk = 0
let prevHeadV = 0
for (let i = 0; i < 8 * 60; i++) {
  const progress = i / (8 * 60)
  stepSarahMotion(m, 1 / 60, progress)
  for (const v of Object.values(m.params).flat()) {
    assert.ok(Number.isFinite(v), "params stay finite")
  }
  const jerk = Math.abs(m.headYaw.v - prevHeadV) * 60
  maxHeadJerk = Math.max(maxHeadJerk, jerk)
  prevHeadV = m.headYaw.v
  if (i % 30 === 0) {
    yaws.push(m.headYaw.x)
    glows.push(m.params.glow[0])
  }
}

const start = butterflyAt(0)
const end = butterflyAt(0.85)
assert.ok(start[0] < -0.3, "butterfly starts on the title side, already in frame")
assert.ok(start[1] > 0.8 && start[1] < 1.05, "butterfly starts at title height")
assert.ok(end[0] > start[0], "butterfly travels toward the laptop")
assert.ok(end[2] > 0.3, "butterfly lands on the screen")
assert.ok(sequenceTargets(0).flyOn === 1, "butterfly is on from the first frame")

const idle = sequenceTargets(0)
const overShoulder = sequenceTargets(0.55)
const finale = sequenceTargets(1)
const midOrbit = sequenceTargets(0.4)
assert.ok(idle.camYaw > 1.0, "idle camera is a three-quarter that reads the room")
assert.ok(overShoulder.camYaw > idle.camYaw, "camera orbits toward the right shoulder")
assert.ok(midOrbit.camYaw > idle.camYaw && finale.camYaw > overShoulder.camYaw, "yaw only increases")
assert.ok(finale.camYaw > 2.4, "finale sits behind her head, over the hair")
assert.ok(finale.camZoom > 2, "finale is tight on the screen")
assert.ok(finale.glow > 0.6, "screen is glowing at the end")
assert.ok(idle.framePan > 0.35, "room starts on the right for the title")
assert.ok(sequenceTargets(0.25).framePan < 0.08, "room fills the frame after the title leaves")
assert.ok(finale.framePan < 0.02, "finale has no side pan")
assert.ok(glows.at(-1) > glows[0], "glow actually rises in the sim")
assert.ok(maxHeadJerk < 80, `head turn stays soft, jerk ${maxHeadJerk.toFixed(1)}`)
assert.ok(yaws[2] < yaws[0] + 0.05, "head turns toward the incoming butterfly")
assert.ok(idle.camDist > 1.28, "idle camera pulls back enough to read the room")
assert.match(shader.SARAH_WGSL, /fn monstera/, "monstera plant is in the scene")
assert.match(shader.SARAH_WGSL, /fn pothos/, "pothos plant is in the scene")
assert.match(shader.SARAH_WGSL, /fn succulent/, "succulent is in the scene")
assert.match(shader.SARAH_WGSL, /fn sideWindow/, "side window is in the scene")
assert.match(shader.SARAH_WGSL, /fn officeChair/, "office chair is in the scene")
assert.match(shader.SARAH_WGSL, /M_FLOOR/, "wood floor material exists")
assert.match(shader.SARAH_WGSL, /lampP/, "desk lamp is a local light")
assert.ok(!shader.SARAH_WGSL.includes("fn potPlant"), "generic potPlant was replaced")

console.log("sarah-motion ok:", {
  startFly: start.map((n) => n.toFixed(2)).join(","),
  endFly: end.map((n) => n.toFixed(2)).join(","),
  cam: `${idle.camYaw.toFixed(2)} → ${overShoulder.camYaw.toFixed(2)} → ${finale.camYaw.toFixed(2)}`,
  glow: finale.glow.toFixed(2),
  zoom: finale.camZoom.toFixed(2),
  headJerk: maxHeadJerk.toFixed(1),
})
