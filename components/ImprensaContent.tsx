"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

// Dados de exemplo para a página de imprensa
const videos = [
  {
    id: 1,
    title: "Rui Rezende: O Olhar da Caatinga",
    description: "Documentário sobre a trajetória do fotógrafo e sua conexão com o sertão",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "24:15",
    source: "TV Globo",
    url: "https://www.youtube.com/watch?v=example1",
  },
  {
    id: 2,
    title: "Entrevista Exclusiva: Rui Rezende",
    description: "Conversa sobre os desafios da fotografia na Caatinga",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "15:42",
    source: "Canal Brasil",
    url: "https://www.youtube.com/watch?v=example2",
  },
  {
    id: 3,
    title: "Bastidores: Expedição Fotográfica",
    description: "Acompanhe Rui Rezende em uma expedição pelo sertão baiano",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "32:08",
    source: "National Geographic",
    url: "https://www.youtube.com/watch?v=example3",
  },
  {
    id: 4,
    title: "A Arte da Fotografia Documental",
    description: "Workshop ministrado por Rui Rezende sobre fotografia documental",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "48:30",
    source: "Festival de Fotografia",
    url: "https://www.youtube.com/watch?v=example4",
  },
]

const reportagens = [
  {
    id: 1,
    title: "O Guardião Visual da Caatinga",
    description: "Perfil do fotógrafo que dedicou sua vida a documentar o sertão brasileiro",
    image: "/placeholder.svg?height=600&width=800",
    date: "12/05/2023",
    source: "Folha de São Paulo",
    url: "https://example.com/reportagem1",
  },
  {
    id: 2,
    title: "Rui Rezende recebe prêmio internacional",
    description: "Fotógrafo baiano é reconhecido por seu trabalho documental sobre a Caatinga",
    image: "/placeholder.svg?height=600&width=800",
    date: "23/08/2023",
    source: "O Globo",
    url: "https://example.com/reportagem2",
  },
  {
    id: 3,
    title: "Exposição 'Cores do Sertão' chega a Paris",
    description: "Trabalho de Rui Rezende ganha destaque internacional em exposição na França",
    image: "/placeholder.svg?height=600&width=800",
    date: "05/11/2023",
    source: "Estadão",
    url: "https://example.com/reportagem3",
  },
  {
    id: 4,
    title: "A Caatinga pelos olhos de Rui Rezende",
    description: "Entrevista especial sobre o maior acervo fotográfico do bioma brasileiro",
    image: "/placeholder.svg?height=600&width=800",
    date: "17/01/2024",
    source: "Revista Bravo",
    url: "https://example.com/reportagem4",
  },
]

const bastidores = [
  {
    id: 1,
    title: "Preparação para Expedição",
    description: "Confira os bastidores da preparação para uma expedição fotográfica",
    image: "/placeholder.svg?height=600&width=800",
    date: "03/04/2023",
    type: "Galeria",
  },
  {
    id: 2,
    title: "Processo de Seleção de Fotos",
    description: "Como Rui Rezende seleciona as imagens para seus livros",
    image: "/placeholder.svg?height=600&width=800",
    date: "19/07/2023",
    type: "Vídeo",
  },
  {
    id: 3,
    title: "Montagem de Exposição",
    description: "Acompanhe o processo de montagem de uma exposição fotográfica",
    image: "/placeholder.svg?height=600&width=800",
    date: "28/09/2023",
    type: "Galeria",
  },
  {
    id: 4,
    title: "Equipamentos e Técnicas",
    description: "Rui Rezende revela seus equipamentos e técnicas favoritas",
    image: "/placeholder.svg?height=600&width=800",
    date: "12/12/2023",
    type: "Artigo",
  },
]

export function ImprensaContent() {
  const videosRef = useRef<HTMLDivElement>(null)
  const reportagensRef = useRef<HTMLDivElement>(null)
  const bastidoresRef = useRef<HTMLDivElement>(null)

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <>
      <Header />
      <main className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-sertao text-[#5A4A3A] mb-4">Imprensa</h1>
            <p className="text-[#8B7355] text-lg max-w-3xl mx-auto">
              Conheça a trajetória de Rui Rezende através de vídeos, reportagens e entrevistas que destacam seu trabalho
              como fotógrafo da Caatinga.
            </p>
          </header>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
              <TabsTrigger value="reportagens">Reportagens</TabsTrigger>
              <TabsTrigger value="bastidores">Bastidores</TabsTrigger>
            </TabsList>

            {/* Seção de Vídeos */}
            <TabsContent value="videos">
              <h2 className="text-2xl font-sertao text-[#5A4A3A] mb-6">Vídeos sobre Rui Rezende</h2>

              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollLeft(videosRef)}
                  aria-label="Rolar para a esquerda"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollRight(videosRef)}
                  aria-label="Rolar para a direita"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div
                  ref={videosRef}
                  className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {videos.map((video) => (
                    <div key={video.id} className="flex-shrink-0 w-[320px] snap-center">
                      <Card className="overflow-hidden border-0 shadow-md">
                        <CardContent className="p-0">
                          <div className="relative aspect-video">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              className="object-cover"
                              sizes="320px"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group hover:bg-black/50 transition-all cursor-pointer">
                              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="h-6 w-6 text-[#8B9A6B] ml-1" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-[#5A4A3A] mb-1">{video.title}</h3>
                            <p className="text-xs text-[#8B7355] mb-2">{video.source}</p>
                            <p className="text-sm text-[#8B7355] line-clamp-2">{video.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Seção de Reportagens */}
            <TabsContent value="reportagens">
              <h2 className="text-2xl font-sertao text-[#5A4A3A] mb-6">Reportagens e Entrevistas</h2>

              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollLeft(reportagensRef)}
                  aria-label="Rolar para a esquerda"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollRight(reportagensRef)}
                  aria-label="Rolar para a direita"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div
                  ref={reportagensRef}
                  className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {reportagens.map((reportagem) => (
                    <div key={reportagem.id} className="flex-shrink-0 w-[320px] snap-center">
                      <Card className="overflow-hidden border-0 shadow-md">
                        <CardContent className="p-0">
                          <div className="relative h-40">
                            <Image
                              src={reportagem.image || "/placeholder.svg"}
                              alt={reportagem.title}
                              fill
                              className="object-cover"
                              sizes="320px"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-[#8B7355]">{reportagem.source}</span>
                              <span className="text-xs text-[#8B7355]">{reportagem.date}</span>
                            </div>
                            <h3 className="font-semibold text-[#5A4A3A] mb-2">{reportagem.title}</h3>
                            <p className="text-sm text-[#8B7355] mb-4 line-clamp-2">{reportagem.description}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-transparent"
                              onClick={() => window.open(reportagem.url, "_blank")}
                            >
                              Ler reportagem
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Seção de Bastidores */}
            <TabsContent value="bastidores">
              <h2 className="text-2xl font-sertao text-[#5A4A3A] mb-6">Bastidores e Documentários</h2>

              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollLeft(bastidoresRef)}
                  aria-label="Rolar para a esquerda"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border-none rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollRight(bastidoresRef)}
                  aria-label="Rolar para a direita"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div
                  ref={bastidoresRef}
                  className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {bastidores.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-[320px] snap-center">
                      <Card className="overflow-hidden border-0 shadow-md">
                        <CardContent className="p-0">
                          <div className="relative h-40">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="320px"
                            />
                            <div className="absolute top-2 right-2 bg-[#8B9A6B] text-white text-xs px-2 py-1 rounded">
                              {item.type}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-end mb-2">
                              <span className="text-xs text-[#8B7355]">{item.date}</span>
                            </div>
                            <h3 className="font-semibold text-[#5A4A3A] mb-2">{item.title}</h3>
                            <p className="text-sm text-[#8B7355] line-clamp-2">{item.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
