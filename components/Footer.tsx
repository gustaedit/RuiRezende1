"use client"

import Link from "next/link"
import { Camera, Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#5A4A3A] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#8B9A6B] rounded-full flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
              <span className="font-cordel font-bold text-lg">Rui Rezende</span>
            </Link>
            <p className="text-sm opacity-80">Fotógrafo da Caatinga brasileira</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <nav className="space-y-2 text-sm">
              <button onClick={() => scrollToSection("bio")} className="block hover:text-[#8B9A6B] transition-colors">
                BIO
              </button>
              <button
                onClick={() => scrollToSection("biblioteca")}
                className="block hover:text-[#8B9A6B] transition-colors"
              >
                LOJA
              </button>
              <Link href="/imprensa" className="block hover:text-[#8B9A6B] transition-colors">
                IMPRENSA
              </Link>
              <button
                onClick={() => scrollToSection("noticias")}
                className="block hover:text-[#8B9A6B] transition-colors"
              >
                NOTÍCIAS
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="block hover:text-[#8B9A6B] transition-colors"
              >
                CONTATOS
              </button>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Cadastro</h4>
            <div className="space-y-2 text-sm">
              <Link href="/cadastro" className="block hover:text-[#8B9A6B] transition-colors">
                Cadastre-se
              </Link>
              <p className="opacity-80">Receba novidades e atualizações</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <address className="space-y-2 text-sm opacity-80 not-italic">
              <p>Salvador, Bahia</p>
              <p>contato@ruirezende.com.br</p>
              <p>(71) 99999-9999</p>
            </address>

            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com/ruirezende"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8B9A6B] transition-colors"
                aria-label="Instagram do Rui Rezende"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/ruirezende"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8B9A6B] transition-colors"
                aria-label="Facebook do Rui Rezende"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@ruirezende.com.br"
                className="hover:text-[#8B9A6B] transition-colors"
                aria-label="Email do Rui Rezende"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 Rui Rezende. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
