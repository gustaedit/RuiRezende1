"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Book {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  longDescription: string
}

interface LibrarySectionProps {
  books: Book[]
}

export function LibrarySection({ books }: LibrarySectionProps) {
  const router = useRouter()
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

  const handleBookClick = (bookId: number) => {
    router.push(`/produto/livro/${bookId}`)
  }

  return (
    <section id="biblioteca" className="py-20 bg-[#F5F2ED]">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-4">Biblioteca de Livros</h2>
        </header>

        <div className="relative">
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
            {books.map((book) => (
              <Card
                key={book.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white flex-shrink-0 w-[280px] snap-center cursor-pointer"
                onClick={() => handleBookClick(book.id)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={book.image || "/placeholder.svg"}
                      alt={`Capa do livro ${book.name} de Rui Rezende`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="280px"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#5A4A3A] mb-2">{book.name}</h3>
                    <p className="text-sm text-[#8B7355] mb-3 line-clamp-2">{book.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#8B9A6B]">R$ {book.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        className="bg-[#8B9A6B] hover:bg-[#7A8A5A]"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBookClick(book.id)
                        }}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
