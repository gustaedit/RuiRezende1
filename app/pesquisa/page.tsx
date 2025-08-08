import type { Metadata } from "next"
import { PesquisaContent } from "@/components/PesquisaContent"

export const metadata: Metadata = {
  title: "Pesquisa | Rui Rezende Photography",
  description: "Pesquise por livros, quadros e fotos do acervo de Rui Rezende.",
}

export default function PesquisaPage() {
  return (
    <div className="min-h-screen bg-[#F5F2ED] pt-20">
      <PesquisaContent />
    </div>
  )
}
