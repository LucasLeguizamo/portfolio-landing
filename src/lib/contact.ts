const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>

export function parseContactPayload(input: unknown): {
  ok: true
  value: ContactPayload
} | {
  ok: false
  fields: ContactFieldErrors
} {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      fields: { message: "El cuerpo de la petición no es un objeto JSON." },
    }
  }

  const raw = input as Record<string, unknown>
  const name = typeof raw.name === "string" ? raw.name.trim() : ""
  const email = typeof raw.email === "string" ? raw.email.trim() : ""
  const message = typeof raw.message === "string" ? raw.message.trim() : ""

  const fields: ContactFieldErrors = {}

  if (name.length < 2) {
    fields.name = "Escribe tu nombre (mínimo 2 caracteres)."
  } else if (name.length > 80) {
    fields.name = "El nombre no puede pasar de 80 caracteres."
  }

  if (!EMAIL_PATTERN.test(email)) {
    fields.email = "El correo no es válido."
  } else if (email.length > 120) {
    fields.email = "El correo no puede pasar de 120 caracteres."
  }

  if (message.length < 12) {
    fields.message = "Cuéntame un poco más (mínimo 12 caracteres)."
  } else if (message.length > 2000) {
    fields.message = "El mensaje no puede pasar de 2000 caracteres."
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields }
  }

  return { ok: true, value: { name, email, message } }
}
