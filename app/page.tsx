import ClientHomePage from "./ClientHomePage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rui Rezende - Fotógrafo da Caatinga | Acervo de 5 Milhões de Fotos",
  description:
    "Explore o maior acervo fotográfico da Caatinga com Rui Rezende. Livros, quadros Fine Art, acervo de fotos e exposições exclusivas do sertão brasileiro.",
  keywords:
    "Rui Rezende, fotografia, Caatinga, sertão, Bahia, livros fotográficos, quadros Fine Art, acervo fotográfico",
  authors: [{ name: "Rui Rezende" }],
  creator: "Rui Rezende",
  publisher: "Rui Rezende Photography",
  openGraph: {
    title: "Rui Rezende - Fotógrafo da Caatinga",
    description: "Explore o maior acervo fotográfico da Caatinga com mais de 5 milhões de fotos",
    url: "https://ruirezende.com.br",
    siteName: "Rui Rezende Photography",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rui Rezende - Fotógrafo da Caatinga",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rui Rezende - Fotógrafo da Caatinga",
    description: "Explore o maior acervo fotográfico da Caatinga",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function HomePage() {
  return <ClientHomePage />
}
