import { Scene } from "@/components/scene"

export function AboutScene() {
  return (
    <Scene
      id="sobre"
      number="02"
      kicker="Sobre mí"
      title="Diseñadora UX/UI. El resto de esta escena llega con el siguiente storyboard."
    >
      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <p>
          Sarah Santana. El cargo ya está en el header; la biografía, el tono
          y las piezas se montan cuando envíes esa capa. Nada prestado.
        </p>
      </div>
    </Scene>
  )
}
