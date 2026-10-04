export type Vec3 = [number, number, number]

export type CameraKey = {
  t: number
  pos: Vec3
  look: Vec3
  fov: number
}

const keys: CameraKey[] = [
  { t: 0, pos: [4.15, 1.72, 4.9], look: [0.55, 1.08, 0.05], fov: 32 },
  { t: 0.16, pos: [3.4, 1.7, 3.6], look: [0.2, 1.15, 0.05], fov: 34 },
  { t: 0.3, pos: [1.55, 1.52, 1.85], look: [0.28, 1.42, 0.2], fov: 30 },
  { t: 0.44, pos: [-1.55, 2.15, 2.35], look: [-0.7, 2.15, -1.55], fov: 32 },
  { t: 0.58, pos: [2.55, 1.35, 2.15], look: [0.1, 1.05, 0.05], fov: 34 },
  { t: 0.72, pos: [0.95, 1.22, 1.05], look: [0.42, 1.16, -0.15], fov: 28 },
  { t: 0.84, pos: [0.48, 1.18, 0.12], look: [0.48, 1.16, -0.55], fov: 26 },
  { t: 1, pos: [0.15, 7.4, 0.2], look: [0.15, 0.2, 0.2], fov: 42 },
]

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerp3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function smooth(t: number) {
  return t * t * (3 - 2 * t)
}

export function sampleCamera(progress: number): CameraKey {
  const t = clamp(progress)
  if (t <= keys[0].t) return keys[0]
  const last = keys[keys.length - 1]
  if (t >= last.t) return last

  const index = keys.findIndex((key) => t <= key.t)
  const from = keys[index - 1]
  const to = keys[index]
  const u = smooth((t - from.t) / (to.t - from.t))

  return {
    t,
    pos: lerp3(from.pos, to.pos, u),
    look: lerp3(from.look, to.look, u),
    fov: lerp(from.fov, to.fov, u),
  }
}
