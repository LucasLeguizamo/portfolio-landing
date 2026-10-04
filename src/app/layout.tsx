import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sarah Santana — Diseñadora UX/UI",
  description:
    "Portafolio de Sarah Santana, diseñadora UX/UI. El scroll es el vuelo de una mariposa hasta su escritorio.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="page-wash min-h-full text-foreground">
        <div className="flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
