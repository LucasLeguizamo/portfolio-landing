"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type ContactFieldErrors, parseContactPayload } from "@/lib/contact"

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string; fields?: ContactFieldErrors }

const empty = { name: "", email: "", message: "" }

export function ContactForm() {
  const [values, setValues] = useState(empty)
  const [state, setState] = useState<FormState>({ status: "idle" })

  const fieldErrors = state.status === "error" ? state.fields : undefined

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = parseContactPayload(values)
    if (!parsed.ok) {
      setState({
        status: "error",
        message: "Revisa los campos del formulario.",
        fields: parsed.fields,
      })
      return
    }

    setState({ status: "submitting" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.value),
      })

      const payload = (await response.json()) as {
        data?: { received?: boolean }
        error?: { message?: string; fields?: ContactFieldErrors }
      }

      if (!response.ok) {
        setState({
          status: "error",
          message:
            payload.error?.message ??
            "No pude enviar el mensaje. Inténtalo de nuevo.",
          fields: payload.error?.fields,
        })
        return
      }

      setValues(empty)
      setState({ status: "success" })
    } catch {
      setState({
        status: "error",
        message: "Se cortó la conexión. Vuelve a intentarlo en un momento.",
      })
    }
  }

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-primary/30 bg-card p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
          Mensaje recibido
        </p>
        <h3 className="mt-3 font-heading text-3xl">Listo. Ya quedó registrado.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          En esta capa el envío es local. El correo de Sarah lo conectamos
          cuando esté en el storyboard de contacto.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setState({ status: "idle" })}
        >
          Escribir otro
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field
        id="name"
        label="Nombre"
        error={fieldErrors?.name}
        value={values.name}
        onChange={(value) => setValues((current) => ({ ...current, name: value }))}
        autoComplete="name"
      />
      <Field
        id="email"
        label="Correo"
        type="email"
        error={fieldErrors?.email}
        value={values.email}
        onChange={(value) => setValues((current) => ({ ...current, email: value }))}
        autoComplete="email"
      />
      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          aria-invalid={Boolean(fieldErrors?.message)}
          aria-describedby={fieldErrors?.message ? "message-error" : undefined}
          placeholder="Cuéntame el proyecto, la fecha y lo que hay que construir."
          className="min-h-36 bg-background text-sm"
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
        />
        {fieldErrors?.message ? (
          <p id="message-error" className="text-sm text-destructive">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state.status === "error" && !fieldErrors ? (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="h-11 px-5"
        disabled={state.status === "submitting"}
      >
        {state.status === "submitting" ? "Enviando…" : "Enviar escena"}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 bg-background text-sm"
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
