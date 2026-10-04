// Sarah's motion as a pure simulation: scroll progress in, shader params out.
// No DOM, no GPU. Node can run it, so the check can assert the sequence.

export const CANVAS_W = 720
export const CANVAS_H = 900
export const SIT_HIP_Y = 0.4
export const HEAD_R = 0.053

type Vec2 = [number, number]
type Vec3 = [number, number, number]
type Vec4 = [number, number, number, number]

export type SarahParams = {
  res: Vec2
  time: number
  progress: number
  head: Vec4
  hair: Vec4
  armL: Vec4
  armR: Vec4
  light: Vec4
  cam: Vec4
  fly: Vec4
  glow: Vec4
  aim: Vec4
}

type Spring = { x: number; v: number }
const spring = (x = 0): Spring => ({ x, v: 0 })
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (t: number) => t * t * (3 - 2 * t)
const approach = (from: number, to: number, rate: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-rate * dt))

function drive(s: Spring, target: number, k: number, zeta: number, dt: number, f = 0) {
  const a = (target - s.x) * k - s.v * 2 * zeta * Math.sqrt(k) + f
  s.v += a * dt
  s.x += s.v * dt
  return a
}

type Joint = { k: number; z: number }
function response(j: Joint, omega: number) {
  const r = omega / Math.sqrt(j.k)
  return { gain: 1 / Math.hypot(1 - r * r, 2 * j.z * r), lag: Math.atan2(2 * j.z * r, 1 - r * r) }
}

const J = {
  head: { k: 28, z: 0.85 },
  cam: { k: 14, z: 1.05 },
  fly: { k: 22, z: 0.8 },
  arm: { k: 40, z: 0.7 },
  hair: { k: 18, z: 0.45 },
  glow: { k: 16, z: 0.9 },
}

const TYPE = response(J.arm, 2 * Math.PI * 1.4)

function range(progress: number, a: number, b: number) {
  return smooth(clamp((progress - a) / Math.max(0.0001, b - a), 0, 1))
}

/** Butterfly path: already on screen by the title → across Sarah → laptop screen. */
export function butterflyAt(progress: number): Vec3 {
  const enter = range(progress, 0.0, 0.28)
  const cross = range(progress, 0.24, 0.52)
  const land = range(progress, 0.50, 0.78)
  const x = lerp(-0.48, lerp(-0.08, 0.1, cross), enter)
  const y = lerp(0.93, lerp(0.88, 0.81, cross), enter) - land * 0.02
  const z = lerp(0.28, lerp(0.22, 0.36, cross), enter)
  return [x, y, z]
}

export function sequenceTargets(progress: number) {
  const intro = range(progress, 0.0, 0.22)
  const notice = range(progress, 0.16, 0.34)
  const follow = range(progress, 0.28, 0.5)
  const orbit = range(progress, 0.32, 0.62)
  const behind = range(progress, 0.58, 0.78)
  const laptop = range(progress, 0.55, 0.75)
  const touch = range(progress, 0.7, 0.82)
  const zoom = range(progress, 0.78, 1)
  const fly = butterflyAt(progress)
  return {
    headYaw: -0.55 * notice * (1 - laptop * 0.85) - 0.08 * follow,
    headPitch: 0.12 + 0.1 * notice - 0.2 * laptop,
    // 3/4 face → right shoulder → behind the head, over the hair. Yaw only rises.
    camYaw: lerp(lerp(1.28, 1.9, orbit), 3.02, behind),
    camPitch: lerp(0.32, 0.18, orbit) + behind * 0.06 + zoom * 0.02,
    camDist: lerp(1.78, lerp(1.22, 0.5, behind), orbit) * (1 - zoom * 0.08),
    camZoom: lerp(lerp(1.02, 1.45, behind), 3.6, zoom),
    // Title lives on the left, so the room starts framed right; then it recenters.
    aimX: lerp(0.02, lerp(0.02, 0.1, behind), intro),
    aimY: lerp(0.84, 0.84, zoom),
    aimZ: lerp(0.08, lerp(0.12, 0.38, behind), orbit),
    glow: touch * (0.35 + 0.65 * zoom),
    pink: touch * 0.45,
    teal: touch * 0.4,
    fly,
    flyOn: 1,
    // +pan keeps the room on the right until the title leaves
    framePan: lerp(0.55, 0, intro),
  }
}

const REST_ARM: Vec4 = [0.85, 0.22, 0.55, 0]

export function createSarahMotion() {
  const params: SarahParams = {
    res: [CANVAS_W, CANVAS_H],
    time: 0,
    progress: 0,
    head: [0, 0.12, 0, 0],
    hair: [0, 0, 0, 0],
    armL: [...REST_ARM],
    armR: [...REST_ARM],
    light: [-0.52, 0.64, 0.32, 1.38],
    cam: [1.28, 0.32, 1.78, 1.02],
    fly: [-0.48, 0.93, 0.28, 0],
    glow: [0, 0, 0, 0],
    aim: [0.02, 0.84, 0.08, 0.55],
  }
  return {
    params,
    time: 0,
    progress: 0,
    progressGoal: 0,
    blinkT: 2.4,
    headYaw: spring(0),
    headPitch: spring(0.12),
    breath: spring(0),
    blink: spring(0),
    hairX: spring(0),
    hairY: spring(0),
    camYaw: spring(1.28),
    camPitch: spring(0.32),
    camDist: spring(1.78),
    camZoom: spring(1.02),
    aimX: spring(0.02),
    aimY: spring(0.84),
    aimZ: spring(0.08),
    framePan: spring(0.55),
    flyX: spring(-0.48),
    flyY: spring(0.93),
    flyZ: spring(0.28),
    glow: spring(0),
    pink: spring(0),
    teal: spring(0),
    armL: { swing: spring(REST_ARM[0]), abd: spring(REST_ARM[1]), elbow: spring(REST_ARM[2]) },
    armR: { swing: spring(REST_ARM[0]), abd: spring(REST_ARM[1]), elbow: spring(REST_ARM[2]) },
    lastHeadAcc: 0,
  }
}

export type SarahMotion = ReturnType<typeof createSarahMotion>

export function relight(m: SarahMotion, look: { dx: number; dy: number } | null) {
  if (!look) return
  const dy = Math.max(-90, look.dy)
  const len = Math.hypot(look.dx, dy, 420)
  m.params.light = [look.dx / len, dy / len, 420 / len, m.params.light[3]]
}

export function stepSarahMotion(m: SarahMotion, dt: number, progress: number) {
  m.time += dt
  // never step a spring's goal: ease progress first (~80 ms)
  m.progressGoal = approach(m.progressGoal, clamp(progress, 0, 1), 12, dt)
  m.progress = m.progressGoal
  const t = sequenceTargets(m.progress)

  const headAcc = drive(m.headYaw, t.headYaw, J.head.k, J.head.z, dt)
  drive(m.headPitch, t.headPitch, J.head.k, J.head.z, dt)
  m.lastHeadAcc = headAcc

  drive(m.camYaw, t.camYaw, J.cam.k, J.cam.z, dt)
  drive(m.camPitch, t.camPitch, J.cam.k, J.cam.z, dt)
  drive(m.camDist, t.camDist, J.cam.k, J.cam.z, dt)
  drive(m.camZoom, t.camZoom, J.cam.k, J.cam.z, dt)
  drive(m.aimX, t.aimX, J.cam.k, J.cam.z, dt)
  drive(m.aimY, t.aimY, J.cam.k, J.cam.z, dt)
  drive(m.aimZ, t.aimZ, J.cam.k, J.cam.z, dt)
  drive(m.framePan, t.framePan, J.cam.k, J.cam.z, dt)

  drive(m.flyX, t.fly[0], J.fly.k, J.fly.z, dt)
  drive(m.flyY, t.fly[1], J.fly.k, J.fly.z, dt)
  drive(m.flyZ, t.fly[2], J.fly.k, J.fly.z, dt)

  drive(m.glow, t.glow, J.glow.k, J.glow.z, dt)
  drive(m.pink, t.pink, J.glow.k, J.glow.z, dt)
  drive(m.teal, t.teal, J.glow.k, J.glow.z, dt)

  drive(m.hairX, -0.35 * headAcc, J.hair.k, J.hair.z, dt, headAcc * 0.15)
  drive(m.hairY, 0.04 * Math.sin(m.time * 1.6), J.hair.k, J.hair.z, dt)

  const breathTarget = 0.5 + 0.5 * Math.sin(m.time * 1.35)
  drive(m.breath, breathTarget, 8, 1, dt)

  m.blinkT -= dt
  let blinkGoal = 0
  if (m.blinkT < 0.12) blinkGoal = 1
  if (m.blinkT < 0) m.blinkT = 2.1 + (m.time % 1.7)
  drive(m.blink, blinkGoal, 90, 0.7, dt)

  const type = (0.08 / TYPE.gain) * Math.sin(m.time * 2 * Math.PI * 1.4 + TYPE.lag) * (1 - range(m.progress, 0.2, 0.4))
  const accL = drive(m.armL.swing, REST_ARM[0] + type, J.arm.k, J.arm.z, dt)
  drive(m.armL.abd, REST_ARM[1], J.arm.k, J.arm.z, dt)
  drive(m.armL.elbow, REST_ARM[2] + 0.08 * type, J.arm.k, J.arm.z, dt, -0.3 * accL)
  const accR = drive(m.armR.swing, REST_ARM[0] - type * 0.6, J.arm.k, J.arm.z, dt)
  drive(m.armR.abd, REST_ARM[1], J.arm.k, J.arm.z, dt)
  drive(m.armR.elbow, REST_ARM[2] - 0.05 * type, J.arm.k, J.arm.z, dt, -0.3 * accR)

  const p = m.params
  p.time = m.time
  p.progress = m.progress
  p.head = [m.headYaw.x, m.headPitch.x, clamp(m.blink.x, 0, 1), clamp(m.breath.x, 0, 1)]
  p.hair = [m.hairX.x, m.hairY.x, 0.04 * m.headYaw.x, 0]
  p.armL = [m.armL.swing.x, m.armL.abd.x, m.armL.elbow.x, 0]
  p.armR = [m.armR.swing.x, m.armR.abd.x, m.armR.elbow.x, 0]
  p.cam = [m.camYaw.x, m.camPitch.x, m.camDist.x, m.camZoom.x]
  p.fly = [m.flyX.x, m.flyY.x, m.flyZ.x, 0.5 + 0.5 * Math.sin(m.time * 22)]
  p.glow = [clamp(m.glow.x, 0, 1), clamp(m.pink.x, 0, 1), clamp(m.teal.x, 0, 1), 0]
  p.aim = [m.aimX.x, m.aimY.x, m.aimZ.x, m.framePan.x]
}
