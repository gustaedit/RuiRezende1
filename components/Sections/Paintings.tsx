"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { CustomPaintingWizardNew } from "@/components/CustomPaintingWizardNew"

interface Painting {
  id: string
  title: string
  price: string
  size: string
  material: string
  theme: string
  location: string
  image: string
}

interface PaintingsProps {
  paintings: Painting[]
}

export function PaintingsSection({ paintings }: PaintingsProps) {
  const router = useRouter()
  const [showCustomWizard, setShowCustomWizard] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handlePaintingClick = (paintingId: string) => {
    router.push(`/produto/quadro/${paintingId}`)
  }

  return (
    <section id="quadros" className="py-20 bg-[#E6D7C3]">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-4">Quadros Prontos</h2>
        </header>

        <div className="relative mb-10">
          {/* Setas de navegação */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
            onClick={scrollLeft}
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
            onClick={scrollRight}
            aria-label="Rolar para a direita"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Container com scroll horizontal */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {paintings.map((painting) => (
              <Card
                key={painting.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white flex-shrink-0 w-[280px] snap-center cursor-pointer"
                onClick={() => handlePaintingClick(painting.id)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={painting.image || "/placeholder.svg"}
                      alt={`Quadro ${painting.title} - ${painting.theme} da ${painting.location}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="280px"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-[#F5F2ED] text-[#5A4A3A] text-xs">
                        {painting.theme}
                      </Badge>
                      <Badge variant="secondary" className="bg-[#F5F2ED] text-[#5A4A3A] text-xs">
                        {painting.location}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#5A4A3A]">{painting.title}</h3>
                    <p className="text-[#8B7355] mb-1 text-sm">{painting.size}</p>
                    <p className="text-xs text-[#8B7355] mb-3">{painting.material}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#8B9A6B]">{painting.price}</span>
                      <Button
                        size="sm"
                        className="bg-[#8B9A6B] hover:bg-[#7A8A5A]"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePaintingClick(painting.id)
                        }}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://wa.me/5571999999999?text=Olá! Gostaria de falar com um consultor sobre quadros personalizados."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Falar com um consultor
            </Button>
          </a>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-[#8B9A6B] text-[#5A4A3A] hover:bg-[#8B9A6B] hover:text-white bg-transparent"
            onClick={() => setShowCustomWizard(true)}
          >
            Criar seu quadro personalizado
          </Button>
        </div>
      </div>

      <CustomPaintingWizardNew isOpen={showCustomWizard} onClose={() => setShowCustomWizard(false)} />
    </section>
  )
}
