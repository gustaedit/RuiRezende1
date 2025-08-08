import {
  Amatic_SC,
  Kalam,
  Caveat,
  Crimson_Text,
  Libre_Baskerville,
  Playfair_Display,
  Nunito_Sans,
  Source_Sans_3 as Source_Sans_Pro,
} from "next/font/google"

/* Fontes Cordel (manuscritas) */
export const cordel = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cordel",
})
export const cordelAlt = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-cordel-alt",
})
export const cordelAlt2 = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cordel-alt2",
})

/* Fontes Sertão (serifadas elegantes) */
export const sertao = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-sertao",
})
export const sertaoAlt = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-sertao-alt",
})
export const sertaoAlt2 = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sertao-alt2",
})

/* Fontes Caatinga (sans-serif funcionais) */
export const caatinga = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-caatinga",
})
export const caatingaAlt = Source_Sans_Pro({
  subsets: ["latin"],
  variable: "--font-caatinga-alt",
})
