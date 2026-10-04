import type { PerspectiveCamera } from "three"

import type { SarahParams } from "@/components/sarah-sdf/sarah-motion"

/** Latest simulation sample. The mesh scene reads it inside useFrame. */
export const sceneBridge: { params: SarahParams | null } = { params: null }

/** Same camera as the old raymarch: orbit around aim, zoom changes fov. */
export function applySarahCamera(camera: PerspectiveCamera, params: SarahParams, width: number, height: number) {
  const [yaw, pitch, dist, zoom] = params.cam
  const [ax, ay, az, pan] = params.aim
  const cp = Math.cos(pitch)
  camera.position.set(
    ax + dist * Math.sin(yaw) * cp,
    ay + dist * Math.sin(pitch),
    az + dist * Math.cos(yaw) * cp,
  )
  camera.up.set(0, 1, 0)
  // +pan looks toward −x so the room sits on the right while the title is up.
  camera.lookAt(ax - pan * 0.72, ay, az)
  const halfH = 0.66 / Math.max(zoom, 0.2)
  camera.fov = (2 * Math.atan(halfH / Math.max(dist, 0.08)) * 180) / Math.PI
  camera.aspect = width / Math.max(height, 1)
  camera.near = 0.04
  camera.far = 24
  camera.updateProjectionMatrix()
}
