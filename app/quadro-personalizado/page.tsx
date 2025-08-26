import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CustomFrameCreator } from "@/components/Sections/custom-frame-creator"

export const metadata: Metadata = {
  title: "Quadro Personalizado | Rui Rezende Photography",
  description:
    "Crie seu quadro personalizado com as fotos do acervo de Rui Rezende. Escolha as dimensões perfeitas para seu espaço.",
}

export default function QuadroPersonalizadoPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F5F2ED] pt-20">
        <CustomFrameCreator />
      </div>
      <Footer />
    </>
  )
}
