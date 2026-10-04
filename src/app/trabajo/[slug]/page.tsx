import Link from "next/link"
import { notFound } from "next/navigation"

import { projects } from "@/lib/content"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return { title: "Proyecto — Sarah Santana" }
  return {
    title: `${project.label} — Sarah Santana`,
    description: `Caso de estudio ${project.label} en el portafolio de Sarah Santana.`,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  return (
    <main className="sarah-os-case page-wash relative min-h-dvh px-6 py-10 sm:px-10">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center">
        <Link
          href="/#trabajo"
          className="w-fit text-[12px] font-medium tracking-[0.18em] text-zinc-600 uppercase"
        >
          ← Escritorio
        </Link>
        <p className="mt-10 text-[11px] tracking-[0.28em] text-zinc-500 uppercase">
          Carpeta
        </p>
        <h1 className="mt-3 text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92] tracking-[-0.03em]">
          {project.label}
        </h1>
        <div
          className="mt-6 h-1.5 w-16 rounded-full"
          style={{ background: project.color }}
        />
        <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {project.hint} La carpeta ya abre; el contenido de este caso se
          monta cuando envíes ese storyboard. Nada prestado.
        </p>
      </div>
    </main>
  )
}
