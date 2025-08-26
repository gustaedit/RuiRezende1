"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation" // 👈 importa router do Next.js
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Grid, List, Search, Heart, MapPin } from "lucide-react"
import { PhotoModal } from "@/components/PhotoModal"
// ❌ import do CustomPaintingWizardNew pode ser removido se não for mais usar
// import { CustomPaintingWizardNew } from "@/components/CustomPaintingWizardNew"

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
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [showPhotoModal, setShowPhotoModal] = useState(false)

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
    // antes abria o wizard: setShowCustomWizard(true)
    router.push("/quadro-personalizado") // 👈 redireciona direto
  }

  return (
    <section id="acervo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-4">Acervo de Fotos</h2>
          <p className="text-[#8B7355] text-lg">Mais de 5 milhões de fotografias da Caatinga</p>
        </header>

        {/* Busca / view */}
        {/* ... resto da lógica de busca e grid permanece igual ... */}

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "space-y-4 max-w-3xl mx-auto"
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
                  {/* ... resto do card */}
                </div>
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
        onCreatePainting={handleCreatePainting} // 👈 já redireciona
      />
    </section>
  )
}
