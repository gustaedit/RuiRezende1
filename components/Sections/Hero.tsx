"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const heroImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250723-WA0063.jpg-hk8BAizvxb1c3QrMQRgWQrraqoy9Bh.jpeg",
    alt: "Agricultor sorridente em plantação de arroz, celebrando a colheita no Oeste da Bahia",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-07-23%20%C3%A0%28s%29%2009.02.54_ada43c7b.jpg-X5EP8XjiZ4TUQWPRihcTWfIGQKsIUA.jpeg",
    alt: "Rui Rezende em expedição fotográfica na Caatinga, documentando a vida dos vaqueiros",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250723-WA0015.jpg-EQYPvOZUy6c19gRbBJs5MG3IQNRgf7.jpeg",
    alt: "Retrato íntimo de vaqueiro sertanejo, mostrando a sabedoria e experiência do sertão",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250723-WA0035.jpg-oiEdSRzgQANBMvkvYIaDzYhhY0O5aU.jpeg",
    alt: "Rui Rezende sobre colheitadeira, documentando a agricultura moderna do Oeste baiano",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250723-WA0082.jpg-x2J2cOYL1pTDJ04jBxACfoQLY0Qh7V.jpeg",
    alt: "Fotografia aérea da Caatinga, Rui Rezende capturando a beleza do bioma brasileiro",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250723-WA0014.jpg-igXMsdm7kuqUdEaaXHkZ6Q2xArAjVm.jpeg",
    alt: "Momento de descontração durante expedição, equipe subindo em árvore da Caatinga",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250723-WA0013.jpg-tbHRRAibthxUBbpM9PwRL5PRxm39VJ.jpeg",
    alt: "Rui Rezende fotografando sobre cavalos, técnica única para capturar ângulos especiais",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250723-WA0021.jpg-hDU2Ew1BfxXEhfAdguP2RRXON485pw.jpeg",
    alt: "Compartilhamento de fotografias com vaqueiros, momento de conexão e troca cultural",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div id="home" className="min-h-screen bg-[#F5F2ED]">
      {/* Mobile Layout */}
      <section className="min-h-screen flex flex-col lg:hidden">
        {/* Mobile Hero Image */}
        <div className="relative h-[60vh] w-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg?height=1200&width=1600"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={90}
              />
            </div>
          ))}

          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Mobile Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 bg-[#F5F2ED] flex flex-col justify-center items-center p-6 text-center">
          <h1 className="text-6xl sm:text-6xl md:text-6xl font-cordel font-bold text-[#5A4A3A] leading-tight mb-6">
            ALÔ VOCÊ
            <br />
            QUE VIAJA
            <br />
            COMIGO
          </h1>

          <div className="flex flex-col gap-4 w-full max-w-sm sm:flex-col">
            <Button
              size="lg"
              variant="outline"
              className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-transparent px-6 py-3"
              onClick={() => scrollToSection("acervo")}
            >
             VER ACERVO
            </Button>
          </div>

          {/* Mobile Image Caption */}
          <div className="mt-6 max-w-md">
            <p className="text-xs text-[#8B7355] font-medium">{heroImages[currentSlide]?.alt}</p>
          </div>
        </div>
      </section>

      {/* Desktop Layout */}
      <section className="hidden lg:flex min-h-screen">
        <div className="w-full flex">
          {/* Desktop - Left Side (75% da tela) */}
          <div className="flex-1 lg:w-3/4 relative">
            <div className="relative h-screen w-full">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg?height=1200&width=1600"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="75vw"
                    quality={90}
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-black/10"></div>

              {/* Desktop Image Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                
              </div>

              {/* Desktop Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                
              </div>
            </div>
          </div>

          {/* Desktop - Right Side (25% da tela) */}
          <div className="w-full bg-[#F5F2ED] flex justify-center items-center p-6 xl:p-8 min-h-screen flex-col lg:w-[17%] xl:w-1/5">
            <div className="text-center space-y-6 xl:space-y-8">
              <h1 className="font-cordel font-bold text-[#5A4A3A] leading-tight leading-9 tracking-wider 2xl:text-6xl text-7xl">
                ALÔ
                <br />
                VOCÊ
                <br />
                QUE
                <br />
                VIAJA
                <br />
                COMIGO
              </h1>

              <div className="flex flex-col gap-3 xl:gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-transparent px-4 xl:px-6 py-3 text-sm xl:text-base"
                  onClick={() => scrollToSection("acervo")}
                >
                  VER ACERVO
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
