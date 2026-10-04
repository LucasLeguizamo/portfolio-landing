import { jsonError, jsonOk } from "@/lib/api-error"
import { parseContactPayload } from "@/lib/contact"

/**
 * POST /api/contact
 *
 * Recibe el formulario de la escena de contacto. En esta capa el envío
 * se confirma en local (no hay proveedor de correo todavía) para no
 * bloquear la landing mientras llegan los storyboards.
 *
 * Error examples:
 * - 400 VALIDATION_ERROR
 *   { "error": { "code": "VALIDATION_ERROR", "message": "Revisa los campos del formulario.", "fields": { "email": "El correo no es válido." } } }
 * - 400 INVALID_JSON
 *   { "error": { "code": "INVALID_JSON", "message": "No pude leer el JSON del cuerpo." } }
 * - 413 PAYLOAD_TOO_LARGE
 *   { "error": { "code": "PAYLOAD_TOO_LARGE", "message": "El mensaje supera el tamaño permitido." } }
 * - 500 INTERNAL_ERROR
 *   { "error": { "code": "INTERNAL_ERROR", "message": "No pude registrar el mensaje. Inténtalo de nuevo." } }
 */
export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > 8_000) {
    return jsonError(
      413,
      "PAYLOAD_TOO_LARGE",
      "El mensaje supera el tamaño permitido.",
    )
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return jsonError(400, "INVALID_JSON", "No pude leer el JSON del cuerpo.")
  }

  const parsed = parseContactPayload(raw)
  if (!parsed.ok) {
    return jsonError(
      400,
      "VALIDATION_ERROR",
      "Revisa los campos del formulario.",
      parsed.fields,
    )
  }

  try {
    console.info("[contact]", {
      name: parsed.value.name,
      email: parsed.value.email,
      length: parsed.value.message.length,
    })

    return jsonOk({
      received: true,
    })
  } catch {
    return jsonError(
      500,
      "INTERNAL_ERROR",
      "No pude registrar el mensaje. Inténtalo de nuevo.",
    )
  }
}

/**
 * GET /api/contact
 *
 * Error examples:
 * - 405 METHOD_NOT_ALLOWED
 *   { "error": { "code": "METHOD_NOT_ALLOWED", "message": "Este endpoint solo acepta POST." } }
 */
export function GET() {
  return jsonError(
    405,
    "METHOD_NOT_ALLOWED",
    "Este endpoint solo acepta POST.",
  )
}
