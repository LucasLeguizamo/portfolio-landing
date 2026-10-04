"use client"

import { useMemo } from "react"
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three"

export function useWoodTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    ctx.fillStyle = "#e4b56f"
    ctx.fillRect(0, 0, 512, 512)

    for (let index = 0; index < 90; index += 1) {
      ctx.strokeStyle = `rgba(110, 62, 22, ${0.035 + (index % 7) * 0.012})`
      ctx.lineWidth = 1.2
      const y = index * 6
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.bezierCurveTo(140, y + 5, 300, y - 6, 512, y + 2)
      ctx.stroke()
    }

    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(1.6, 1)
    return texture
  }, [])
}

export function useWallTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext("2d")
    if (!ctx) return null
    ctx.fillStyle = "#fff8ec"
    ctx.fillRect(0, 0, 256, 256)
    for (let index = 0; index < 400; index += 1) {
      const grain = ((index * 37) % 100) / 2000
      ctx.fillStyle = `rgba(230, 210, 170, ${grain})`
      ctx.fillRect((index * 53) % 256, (index * 97) % 256, 2, 2)
    }
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(4, 3)
    return texture
  }, [])
}
