"use client"
import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Grid3X3, List, X, Palette, MapPin, Calendar, Tag, PenBox } from 'lucide-react'

interface Photo {
  id: string
  title: string
  location: string
  category: string
  tags: string[]
  image: string
  date: string
  description: string
}

const photos: Photo[] = [
  {
    id: "1",
    title: "Vaqueiro do Sertão",
    location: "Juazeiro-BA",
    category: "Retratos",
    tags: ["vaqueiro", "sertão", "tradição", "nordeste"],
    image: "/placeholder.svg?height=400&width=600&text=Vaqueiro+do+Sertão",
    date: "2023-08-15",
    description: "Retrato íntimo de um vaqueiro experiente da região de Juazeiro, mostrando a sabedoria e resistência do homem sertanejo."
  },
  {
    id: "2",
    title: "Plantação de Arroz",
    location: "Oeste da Bahia",
    category: "Agricultura",
    tags: ["agricultura", "arroz", "colheita", "campo"],
    image: "/placeholder.svg?height=400&width=600&text=Plantação+de+Arroz",
    date: "2023-07-20",
    description: "Agricultor celebrando a colheita em uma vasta plantação de arroz no Oeste baiano, símbolo da modernização agrícola."
  },
  {
    id: "3",
    title: "Caatinga ao Amanhecer",
    location: "Petrolina-PE",
    category: "Paisagens",
    tags: ["caatinga", "amanhecer", "natureza", "bioma"],
    image: "/placeholder.svg?height=400&width=600&text=Caatinga+Amanhecer",
    date: "2023-09-10",
    description: "A beleza única da Caatinga capturada nos primeiros raios de sol, revelando a diversidade deste bioma brasileiro."
  },
  {
    id: "4",
    title: "Feira de Juazeiro",
    location: "Juazeiro-BA",
    category: "Cultura",
    tags: ["feira", "comércio", "cultura", "tradição"],
    image: "/placeholder.svg?height=400&width=600&text=Feira+de+Juazeiro",
    date: "2023-06-05",
    description: "A movimentada feira livre de Juazeiro, centro de comércio e encontro cultural da região do Vale do São Francisco."
  },
  {
    id: "5",
    title: "Rio São Francisco",
    location: "Petrolina-PE",
    category: "Paisagens",
    tags: ["rio", "são francisco", "água", "natureza"],
    image: "/placeholder.svg?height=400&width=600&text=Rio+São+Francisco",
    date: "2023-05-18",
    description: "O majestoso Rio São Francisco, fonte de vida e desenvolvimento para toda a região do Vale."
  },
  {
    id: "6",
    title: "Artesã Ceramista",
    location: "Juazeiro-BA",
    category: "Retratos",
    tags: ["artesanato", "cerâmica", "tradição", "mulher"],
    image: "/placeholder.svg?height=400&width=600&text=Artesã+Ceramista",
    date: "2023-04-22",
    description: "Retrato de uma artesã ceramista, preservando técnicas ancestrais na criação de peças únicas."
  },
  {
    id: "7",
    title: "Mandacaru Florido",
    location: "Sertão da Bahia",
    category: "Natureza",
    tags: ["mandacaru", "flora", "sertão", "resistência"],
    image: "/placeholder.svg?height=400&width=600&text=Mandacaru+Florido",
    date: "2023-03-12",
    description: "O mandacaru em flor, símbolo de esperança e resistência do povo sertanejo, anunciando tempos de chuva."
  },
  {
    id: "8",
    title: "Pescador do São Francisco",
    location: "Petrolina-PE",
    category: "Retratos",
    tags: ["pescador", "rio", "trabalho", "tradição"],
    image: "/placeholder.svg?height=400&width=600&text=Pescador+São+Francisco",
    date: "2023-02-28",
    description: "Pescador tradicional do Rio São Francisco, mantendo viva uma profissão ancestral e essencial para a região."
  }
]

const categories = ["Todas", "Retratos", "Paisagens", "Agricultura", "Cultura", "Natureza"]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           photo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === "Todas" || photo.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleBuyDigital = (photo: Photo) => {
    // Lógica para comprar foto digital
    console.log("Comprando foto digital:", photo.title)
  }

  const handleCreateFrame = (photo: Photo, frameType: string) => {
    // Lógica para criar quadro
    console.log("Criando quadro:", photo.title, "Tipo:", frameType)
  }

  return (
    <section id="acervo" className="py-12 sm:py-16 lg:py-20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cordel font-bold text-[#5A4A3A] mb-4">
            Acervo Fotográfico
          </h2>
          <p className="text-sm sm:text-base text-[#8B7355] max-w-2xl mx-auto">
            Explore a rica coleção de fotografias que retratam a essência do sertão nordestino
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-4 h-4" />
              <Input
                placeholder="Buscar por título, local ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-[#D4B896] focus:border-[#8B9A6B]"
              />
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2">
              {/* Categoria */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 bg-white border-[#D4B896]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-[#D4B896] rounded-md bg-white">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#8B9A6B] text-white" : "text-[#8B7355]"}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#8B9A6B] text-white" : "text-[#8B7355]"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="flex items-center justify-between text-sm text-[#8B7355]">
            <span>{filteredPhotos.length} fotografias encontradas</span>
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="text-[#8B7355] hover:text-[#8B9A6B]"
              >
                Limpar busca
              </Button>
            )}
          </div>
        </div>

        {/* Gallery */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-[#8B9A6B] text-white text-xs">
                      {photo.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-[#5A4A3A] mb-1 text-sm sm:text-base line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8B7355] mb-2 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {photo.location}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {photo.tags.length > 2 && (
                      <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] text-xs">
                        +{photo.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-32 sm:h-24">
                    <Image
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#5A4A3A] mb-1">{photo.title}</h3>
                        <p className="text-sm text-[#8B7355] mb-2 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {photo.location}
                          <Calendar className="w-3 h-3 ml-3 mr-1" />
                          {new Date(photo.date).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-sm text-[#8B7355] mb-2 line-clamp-2">
                          {photo.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {photo.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-[#8B9A6B] text-white ml-4">
                        {photo.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#8B7355] mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhuma fotografia encontrada</p>
              <p className="text-sm">Tente ajustar os filtros ou termos de busca</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Todas")
              }}
              className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {selectedPhoto.title}
                <Button variant="ghost" size="icon" onClick={() => setSelectedPhoto(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 p-6">
              {/* Imagem Principal */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={selectedPhoto.image || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
              </div>

              {/* Informações */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#5A4A3A] mb-2">{selectedPhoto.title}</h2>
                    <div className="space-y-1 text-[#8B7355]">
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <strong>Local:</strong> {selectedPhoto.location}
                      </p>
                      <p className="flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        <strong>Categoria:</strong> {selectedPhoto.category}
                      </p>
                      <p className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <strong>Data:</strong> {new Date(selectedPhoto.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <p className="text-[#8B7355] mt-3">{selectedPhoto.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-[#5A4A3A] mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedPhoto.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-[#F5F2ED]">
                    <h3 className="font-semibold text-[#5A4A3A] mb-3">Opções de Compra</h3>
                    <div className="space-y-3">
                      {/* Foto Digital */}
                      <div className="flex items-center justify-between p-3 border rounded bg-white">
                        <div>
                          <p className="font-medium text-[#5A4A3A]">Coleçao de fotos</p>
                          <p className="text-sm text-[#8B7355]">Alta resolução para uso pessoal</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#8B9A6B]">Consultar0</p>
                          <Button 
                            size="sm" 
                            className="bg-[#8B9A6B] hover:bg-[#7A8A5A]" 
                            onClick={() => handleBuyDigital(selectedPhoto)}
                          >
                            <PenBox className="h-3 w-3 mr-1" />
                            Comprar
                          </Button>
                        </div>
                      </div>

                      {/* Quadros */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded bg-white">
                          <div>
                            <p className="font-medium text-[#5A4A3A] text-sm">Quadrado 4x4</p>
                            <p className="text-xs text-[#8B7355]">40x40cm</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#8B9A6B] text-sm">R$ 240</p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-white text-xs px-2 py-1"
                              onClick={() => handleCreateFrame(selectedPhoto, 'Quadrado 4x4')}
                            >
                              <Palette className="h-3 w-3 mr-1" />
                              Criar
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded bg-white">
                          <div>
                            <p className="font-medium text-[#5A4A3A] text-sm">Original 6x4</p>
                            <p className="text-xs text-[#8B7355]">60x40cm</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#8B9A6B] text-sm">R$ 360</p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-white text-xs px-2 py-1"
                              onClick={() => handleCreateFrame(selectedPhoto, 'Original 6x4')}
                            >
                              <Palette className="h-3 w-3 mr-1" />
                              Criar
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded bg-white">
                          <div>
                            <p className="font-medium text-[#5A4A3A] text-sm">Panorâmico 12x4</p>
                            <p className="text-xs text-[#8B7355]">120x40cm</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#8B9A6B] text-sm">R$ 720</p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-white text-xs px-2 py-1"
                              onClick={() => handleCreateFrame(selectedPhoto, 'Panorâmico 12x4')}
                            >
                              <Palette className="h-3 w-3 mr-1" />
                              Criar
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 border rounded bg-white">
                          <div>
                            <p className="font-medium text-[#5A4A3A] text-sm">Personalizado</p>
                            <p className="text-xs text-[#8B7355]">Tamanho customizado</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#8B9A6B] text-sm">A partir de R$ 180</p>
                            <Button
                              size="sm"
                              className="bg-[#8B9A6B] hover:bg-[#7A8A5A] text-white text-xs px-2 py-1"
                              onClick={() => handleCreateFrame(selectedPhoto, 'Personalizado')}
                            >
                              <Palette className="h-3 w-3 mr-1" />
                              Personalizar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
