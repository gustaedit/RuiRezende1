"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Release {
  id: number
  type: string
  title: string
  description: string
  image: string
  date: string
}

interface LatestReleasesProps {
  releases: Release[]
}

export function LatestReleasesSection({ releases }: LatestReleasesProps) {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)

  return (
    <section id="lancamentos" className="py-20 bg-[#F5F2ED]">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-4">Últimos Lançamentos</h2>
          <p className="text-[#8B7355] text-lg">Novos quadros, fotos e livros</p>
        </header>

        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {releases.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Card className="border-0 bg-white">
                    <CardContent className="p-0">
                      <div className="md:flex">
                        <div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width:768px) 100vw, 50vw"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-8 md:w-1/2 flex flex-col justify-center">
                          <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] w-fit mb-4">
                            {item.type}
                          </Badge>
                          <h3 className="text-2xl font-semibold mb-4 text-[#5A4A3A]">{item.title}</h3>
                          <p className="text-[#8B7355] mb-6 leading-relaxed">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#8B7355]">{item.date}</span>
                            <Button className="bg-[#8B9A6B] hover:bg-[#7A8A5A]">Saiba mais</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent((current - 1 + releases.length) % releases.length)}
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {releases.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === current ? "bg-[#8B9A6B]" : "bg-[#D4B896]"
                  }`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent((current + 1) % releases.length)}
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPlaying(!playing)} aria-label="Play/Pause autoplay">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
