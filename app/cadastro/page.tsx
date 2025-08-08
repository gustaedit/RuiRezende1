import type { Metadata } from "next"
import { CadastroForm } from "@/components/CadastroForm"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Cadastro | Rui Rezende Photography",
  description: "Cadastre-se para receber novidades e atualizações sobre o trabalho de Rui Rezende.",
}

export default function CadastroPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F5F2ED] pt-20">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-sertao text-[#5A4A3A] mb-4">Cadastro</h1>
            <p className="text-[#8B7355]">Receba novidades e atualizações sobre o trabalho de Rui Rezende.</p>
          </div>
          <CadastroForm />
        </div>
      </div>
      <Footer />
    </>
  )
}
