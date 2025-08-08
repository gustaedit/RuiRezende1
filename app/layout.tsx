import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { cordel, cordelAlt, cordelAlt2, sertao, sertaoAlt, sertaoAlt2, caatinga, caatingaAlt } from "@/lib/fonts"

export const metadata: Metadata = {
  metadataBase: new URL("https://ruirezende.com.br"),
  title: {
    default: "Rui Rezende - Fotógrafo da Caatinga",
    template: "%s | Rui Rezende Photography",
  },
  description:
    "Explore o maior acervo fotográfico da Caatinga com Rui Rezende. Livros, quadros Fine Art e exposições do sertão brasileiro.",
  generator: "Next.js",
  applicationName: "Rui Rezende Photography",
  referrer: "origin-when-cross-origin",
  keywords: ["Rui Rezende", "fotografia", "Caatinga", "sertão", "Bahia", "livros fotográficos", "quadros Fine Art"],
  authors: [{ name: "Rui Rezende", url: "https://ruirezende.com.br" }],
  creator: "Rui Rezende",
  publisher: "Rui Rezende Photography",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cordel.variable} ${cordelAlt.variable} ${cordelAlt2.variable} ${sertao.variable} ${sertaoAlt.variable} ${sertaoAlt2.variable} ${caatinga.variable} ${caatingaAlt.variable}`}
    >
      <head>
        <link rel="canonical" href="https://ruirezende.com.br" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8B9A6B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
