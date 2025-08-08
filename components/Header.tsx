"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Menu, UserPlus, Newspaper, ChevronDown, ChevronRight } from "lucide-react"
import { ShoppingCartIcon } from "./ShoppingCart"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const sections = {
    loja: [
      { label: "Livros", id: "biblioteca" },
      { label: "Quadros", id: "quadros" },
      { label: "Quadros Prontos", id: "quadros-prontos" },
      { label: "Acervo", id: "acervo" }
    ],
    clientes: [
      { label: "Imagens de Clientes", id: "clientes" },
      { label: "Depoimentos", id: "depoimentos" }
    ]
  }

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") return
      const scrollPosition = window.scrollY + 100
      const allSections = [
        "home", "bio", "biblioteca", "quadros", "quadros-prontos",
        "acervo", "noticias", "clientes", "depoimentos", "contato"
      ]
      for (const section of allSections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const goTo = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-[#E6D7C3]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B9A6B] rounded-full flex items-center justify-center">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="font-cordel font-bold text-[#5A4A3A] text-4xl">Rui Rezende</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" className="text-[#5A4A3A]" onClick={() => goTo("bio")}>BIO</Button>

          {/* Dropdown LOJA */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-[#5A4A3A] flex items-center gap-1">
                LOJA <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sections.loja.map((item, i) => (
                <DropdownMenuItem key={i} onClick={() => goTo(item.id)}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/imprensa">
            <Button
              variant="ghost"
              className={`text-[#5A4A3A] ${pathname === "/imprensa" ? "bg-[#E6D7C3]/50" : ""}`}
            >
              IMPRENSA
            </Button>
          </Link>

          <Button variant="ghost" className="text-[#5A4A3A]" onClick={() => goTo("noticias")}>
            NOTÍCIAS
          </Button>

          {/* Dropdown CLIENTES */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-[#5A4A3A] flex items-center gap-1">
                CLIENTES <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sections.clientes.map((item, i) => (
                <DropdownMenuItem key={i} onClick={() => goTo(item.id)}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="text-[#5A4A3A]" onClick={() => goTo("contato")}>
             FALE COM RUI
          </Button>

          <Link href="/pesquisa">
            <Button
              variant="ghost"
              className={`text-[#5A4A3A] ${pathname === "/pesquisa" ? "bg-[#E6D7C3]/50" : ""}`}
            >
              PESQUISA
            </Button>
          </Link>


          <Link href="/cadastro">
            <Button variant="outline" size="sm" className="border-[#8B9A6B] text-[#8B9A6B]">
              <UserPlus className="h-4 w-4 mr-2" /> Cadastre-se
            </Button>
          </Link>

          <ShoppingCartIcon />
        </nav>

        {/* Botões Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <ShoppingCartIcon />
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E6D7C3] shadow-lg">
          <nav className="px-4 py-2 space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => goTo("bio")}>
              BIO
            </Button>

            {/* Mobile Dropdown LOJA */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setOpenMobileDropdown(openMobileDropdown === "loja" ? null : "loja")}
              >
                LOJA <ChevronRight className={`h-4 w-4 transition-transform ${openMobileDropdown === "loja" ? "rotate-90" : ""}`} />
              </Button>
              {openMobileDropdown === "loja" && (
                <div className="pl-4 space-y-1">
                  {sections.loja.map((item, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => goTo(item.id)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/imprensa">
              <Button variant="ghost" className="w-full justify-start">IMPRENSA</Button>
            </Link>

            <Button variant="ghost" className="w-full justify-start" onClick={() => goTo("noticias")}>
              NOTÍCIAS
            </Button>

            {/* Mobile Dropdown CLIENTES */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setOpenMobileDropdown(openMobileDropdown === "clientes" ? null : "clientes")}
              >
                CLIENTES <ChevronRight className={`h-4 w-4 transition-transform ${openMobileDropdown === "clientes" ? "rotate-90" : ""}`} />
              </Button>
              {openMobileDropdown === "clientes" && (
                <div className="pl-4 space-y-1">
                  {sections.clientes.map((item, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => goTo(item.id)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <Button variant="ghost" className="w-full justify-start" onClick={() => goTo("contato")}>
               FALE COM RUI
            </Button>

            <Link href="/pesquisa">
              <Button variant="ghost" className="w-full justify-start">PESQUISA</Button>
            </Link>

          </nav>
        </div>
      )}
    </header>
  )
}
