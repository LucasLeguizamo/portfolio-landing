export const site = {
  name: "Sarah Santana",
  firstName: "Sarah",
  lastName: "Santana",
  role: "Diseñadora UX/UI",
  cta: "Conoce mi mundo",
}

export const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#sobre", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
] as const

export const contact = {
  title: "Contacto",
  whatsapp: "https://wa.me/573001846300",
  columns: [
    [
      { label: "Teléfono", value: "+57 300 184 6300", href: "tel:+573001846300" },
      { label: "Nacionalidad", value: "Colombiana" },
    ],
    [
      {
        label: "Instagram",
        value: "@__santanaaaaaaaa",
        href: "https://www.instagram.com/__santanaaaaaaaa/",
      },
      {
        label: "Email",
        value: "sarah.santanac02@gmail.com",
        href: "mailto:sarah.santanac02@gmail.com",
      },
    ],
    [
      {
        label: "Linkedin",
        value: "@sarahsantanaco",
        href: "https://www.linkedin.com/in/sarahsantanaco",
      },
      {
        label: "Github",
        value: "sarahsantanac02-ai",
        href: "https://github.com/sarahsantanac02-ai",
      },
    ],
  ],
} as const

export const projects = [
  {
    slug: "emihs",
    label: "EMIHS",
    color: "#e38b7a",
    hint: "El caso de estudio llega con el siguiente storyboard.",
  },
  {
    slug: "antidoto-social",
    label: "ANTÍDOTO SOCIAL",
    color: "#9eb4c9",
    hint: "El caso de estudio llega con el siguiente storyboard.",
  },
  {
    slug: "drop",
    label: "DROP",
    color: "#e8c75a",
    hint: "El caso de estudio llega con el siguiente storyboard.",
  },
  {
    slug: "cardenalia",
    label: "CARDENALIA",
    color: "#a9b892",
    hint: "El caso de estudio llega con el siguiente storyboard.",
  },
  {
    slug: "hackathons",
    label: "HACKATHONS",
    color: "#b7a6c9",
    hint: "El caso de estudio llega con el siguiente storyboard.",
  },
] as const

export type Project = (typeof projects)[number]

export const dockTools = [
  { id: "figma", name: "Figma" },
  { id: "illustrator", name: "Adobe Illustrator" },
  { id: "premiere", name: "Adobe Premiere Pro" },
  { id: "claude", name: "Claude" },
  { id: "lovable", name: "Lovable" },
  { id: "canva", name: "Canva" },
  { id: "meta", name: "Meta" },
] as const
