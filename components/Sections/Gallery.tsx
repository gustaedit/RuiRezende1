"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Grid, List, Search, Heart, MapPin } from "lucide-react"
import { PhotoModal } from "@/components/PhotoModal"
import { CustomPaintingWizardNew } from "@/components/CustomPaintingWizardNew"

interface Photo {
  id: string
  title: string
  location: string
  category: string
  tags: string[]
  image: string
}

interface GallerySectionProps {
  photos: Photo[]
}

export function GallerySection({ photos }: GallerySectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [showCustomWizard, setShowCustomWizard] = useState(false)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const filtered = photos.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
    setShowPhotoModal(true)
  }

  const handleCreatePainting = (photo: Photo) => {
    setShowCustomWizard(true)
  }

  return (
    <section id="acervo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-4">Acervo de Fotos</h2>
          <p className="text-[#8B7355] text-lg">Mais de 5 milhões de fotografias da Caatinga</p>
        </header>

        {/* Busca / view */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7355] h-5 w-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tags, lugar ou tema..."
              className="pl-12 h-12 border-[#D4B896] focus:border-[#8B9A6B]"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              aria-label="Exibir em grade"
              className={viewMode === "grid" ? "bg-[#8B9A6B] hover:bg-[#7A8A5A]" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              aria-label="Exibir em lista"
              className={viewMode === "list" ? "bg-[#8B9A6B] hover:bg-[#7A8A5A]" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Fotos */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4 max-w-3xl mx-auto"
          }
        >
          {filtered.map((photo) => (
            <Card
              key={photo.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white"
              onClick={() => handlePhotoClick(photo)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={photo.image || "/placeholder.svg"}
                    alt={`${photo.title} - ${photo.location} - Fotografia de Rui Rezende`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:768px) 50vw, (max-width:1280px) 25vw, 20vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(photo.id)
                    }}
                    aria-label="Favoritar"
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(photo.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1">{photo.title}</h3>
                    <div className="flex items-center gap-1 text-xs opacity-90">
                      <MapPin className="h-3 w-3" />
                      {photo.location}
                    </div>
                  </div>
                </div>
                {viewMode === "list" && (
                  <div className="p-4">
                    <h3 className="font-semibold text-[#5A4A3A] mb-1">{photo.title}</h3>
                    <p className="text-sm text-[#8B7355]">{photo.category}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <PhotoModal
        photo={selectedPhoto}
        isOpen={showPhotoModal}
        onClose={() => {
          setShowPhotoModal(false)
          setSelectedPhoto(null)
        }}
        onCreatePainting={handleCreatePainting}
      />

      <CustomPaintingWizardNew isOpen={showCustomWizard} onClose={() => setShowCustomWizard(false)} />
    </section>
  )
}
