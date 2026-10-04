import Image from "next/image"

import { contact, site } from "@/lib/content"

export function ContactScene() {
  return (
    <section
      id="contacto"
      className="contact-mac relative scroll-mt-24 overflow-hidden px-[6vw] py-20 sm:py-28"
      aria-label="Contacto de Sarah Santana"
    >
      <div className="contact-mac-glow" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-[1100px] justify-center">
        <div className="contact-glass">
          <a
            href={contact.whatsapp}
            className="contact-avatar"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/sarah/memoji.png"
              alt={`Memoji de ${site.name}`}
              width={96}
              height={96}
              className="size-20 rounded-full object-cover sm:size-24"
            />
            <span className="contact-wa" aria-hidden>
              <PhoneGlyph />
            </span>
            <span className="sr-only">Escribir a Sarah por WhatsApp</span>
          </a>

          <div className="min-w-0 flex-1">
            <p className="font-sans text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
              {contact.title}
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-3 sm:gap-8">
              {contact.columns.map((column) => (
                <div key={column[0].label} className="space-y-2.5">
                  {column.map((item) => (
                    <p key={item.label} className="leading-snug">
                      <span className="block text-[11px] font-medium text-zinc-500">
                        {item.label}
                      </span>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          className="text-[13px] font-medium break-all text-zinc-900 underline-offset-4 hover:underline sm:text-sm"
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[13px] font-medium text-zinc-900 sm:text-sm">
                          {item.value}
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M7.2 3.8c.4-.4 1.1-.5 1.6-.2l2.1 1.3c.5.3.7.9.5 1.5l-.7 2.1a1.2 1.2 0 0 0 .3 1.2l2.3 2.3c.3.3.8.4 1.2.3l2.1-.7c.6-.2 1.2 0 1.5.5l1.3 2.1c.3.5.2 1.2-.2 1.6l-1.2 1.2c-.5.5-1.2.7-1.9.6-2-.3-4.8-1.8-7.3-4.3S4.9 9.2 4.6 7.2c-.1-.7.1-1.4.6-1.9l1-1.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
