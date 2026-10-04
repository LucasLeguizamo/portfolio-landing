# Portafolio de Sarah Santana

Landing en capas para Sarah Santana, diseñadora UX/UI. La primera capa es el header: un escritorio 3D a pantalla completa y una mariposa amarilla atada al scroll.

## Cómo corre el header

El header es una escena de malla (React Three Fiber): luz, sombra suave y materiales. El scroll sigue la misma película. El nombre va encima, a la izquierda, y se apaga. Entonces la habitación se recentra, siempre a pantalla completa. Cuando haya un GLB de Sarah, reemplaza la figura estilizada sin tocar la cámara.

1. El titular HTML cubre la izquierda: nombre, cargo, *Conoce mi mundo*. El 3D arranca a la derecha.
2. Sarah, el piso, la alfombra, la ventana, el escritorio, la silla, las plantas, la lámpara y la mariposa son mallas con luz real.
3. El scroll: idle tipeando → la mariposa ya está en cuadro → Sarah la sigue → órbita al hombro derecho → cámara detrás de la cabeza, sobre el pelo → la mariposa toca la pantalla → zoom completo → el fondo físico se disuelve y entra el escritorio digital de Sarah.

```bash
pnpm install
pnpm dev
```

Abre [http://127.0.0.1:43147](http://127.0.0.1:43147). Desde el primer frame la habitación es 3D. El nombre va encima, a la izquierda. No hay foto de referencia en el hero. El escritorio digital está en `/#trabajo`.

### Si se te cae el localhost

El puerto es `43147`. En la terminal del Mac:

```bash
cd ~/portfolio-landing
# Si quedó un proceso colgado:
lsof -ti :43147 | xargs kill -9
rm -rf .next
pnpm install
pnpm dev
```

Luego recarga duro en Chrome o Safari (`Cmd+Shift+R`) y abre [http://127.0.0.1:43147/#trabajo](http://127.0.0.1:43147/#trabajo) para ver el escritorio.

Si `git pull` no trae el commit de crema, ámbar y vidrio, este clone no está siguiendo el remoto de este proyecto. Crea el repositorio con la pastilla **Create repo** y vuelve a clonar, o apunta `origin` a ese remoto.

## Qué hace falta para el skill `sdf-character`

El skill no inventa al personaje. Para usarlo mándame esto, nada más:

1. **Turnaround de Sarah** (imágenes, no el storyboard de layout):
   - Frente
   - Un perfil (mejor los dos)
   - Tres cuartos
   - Espalda
   - Mínimo aceptable: frente + un perfil
   - PNG, JPG o WebP. Ilustración, render o foto. La foto del escritorio sola no sirve: no se pueden medir cabeza, pelo, ropa ni proporciones.

2. **Dónde vive en la página**:
   - El escenario SDF es siempre a pantalla completa
   - El título HTML se superpone y se apaga; la habitación se recentra, no se encoge a un bloque

3. **Qué hace**:
   - idle / sentada
   - camina
   - saluda
   - mira el cursor
   - o una secuencia (camina → se detiene → saluda)

4. **Opcional**: paleta (piel, pelo, ropa) o una nota de marca. Si la mandas, manda sobre mi gusto.

El skill corre en **WebGPU** (Chrome, Edge o Safari reciente). No usa Three.js ni Blender. Sin el turnaround no se puede puntuar ni construir el SDF.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui y React Three Fiber. El gestor de paquetes es pnpm. El header ya no usa el raymarch SDF.
