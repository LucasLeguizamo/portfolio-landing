import { Color, MeshPhysicalMaterial, MeshStandardMaterial } from "three"

export const skinMat = new MeshPhysicalMaterial({
  color: "#c48866",
  roughness: 0.46,
  metalness: 0,
  sheen: 0.42,
  sheenRoughness: 0.55,
  sheenColor: new Color("#ffc9aa"),
})

export const hairMat = new MeshPhysicalMaterial({
  color: "#1a120e",
  roughness: 0.38,
  metalness: 0.04,
  sheen: 0.7,
  sheenRoughness: 0.35,
  sheenColor: new Color("#3a2a22"),
})

export const blouseMat = new MeshStandardMaterial({
  color: "#f4efe6",
  roughness: 0.72,
  metalness: 0,
})

export const jeanMat = new MeshStandardMaterial({
  color: "#2a5f9e",
  roughness: 0.78,
  metalness: 0,
})

export const lipMat = new MeshStandardMaterial({
  color: "#a8645c",
  roughness: 0.45,
})

export const glassMat = new MeshStandardMaterial({
  color: "#d5e4ea",
  roughness: 0.05,
  metalness: 0,
  transparent: true,
  opacity: 0.18,
})

export const frameMat = new MeshStandardMaterial({
  color: "#2c2926",
  roughness: 0.32,
  metalness: 0.45,
})

export const woodMat = new MeshStandardMaterial({
  color: "#a56b3c",
  roughness: 0.62,
  metalness: 0.02,
})

export const woodDarkMat = new MeshStandardMaterial({
  color: "#7a4e2b",
  roughness: 0.7,
})

export const floorMat = new MeshStandardMaterial({
  color: "#d7b48a",
  roughness: 0.78,
})

export const rugMat = new MeshStandardMaterial({
  color: "#e7a090",
  roughness: 0.92,
})

export const leafMat = new MeshStandardMaterial({
  color: "#2f8f62",
  roughness: 0.55,
  side: 2,
})

export const potMat = new MeshStandardMaterial({
  color: "#c4654a",
  roughness: 0.58,
})

export const ceramicMat = new MeshStandardMaterial({
  color: "#f3ece3",
  roughness: 0.28,
  metalness: 0.02,
})

export const brassMat = new MeshStandardMaterial({
  color: "#d7a441",
  roughness: 0.32,
  metalness: 0.72,
})

export const silverMat = new MeshStandardMaterial({
  color: "#d5dbe3",
  roughness: 0.28,
  metalness: 0.62,
})

export const chairMat = new MeshStandardMaterial({
  color: "#f6f1ea",
  roughness: 0.7,
})

export const curtainMat = new MeshStandardMaterial({
  color: "#f0cfc6",
  roughness: 0.86,
  side: 2,
})

export const butterflyMat = new MeshStandardMaterial({
  color: "#f5c400",
  roughness: 0.35,
  emissive: "#e0a800",
  emissiveIntensity: 0.45,
  side: 2,
})
