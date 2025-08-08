"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Search, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { photos } from "@/data"

interface CustomPaintingWizardProps {
  isOpen: boolean
  onClose: () => void
}

const frames = [
  { name: "Sem moldura", price: 0 },
  { name: "Moldura natural", price: 120 },
  { name: "Moldura branca", price: 120 },
  { name: "Moldura preta", price: 120 },
]

export function CustomPaintingWizardNew({ isOpen, onClose }: CustomPaintingWizardProps) {
  const [step, setStep] = useState(1)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [selectedFrame, setSelectedFrame] = useState(frames[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [enlargedPhoto, setEnlargedPhoto] = useState<any>(null)
  const { addItem } = useCart()

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Cálculo do preço baseado na área (cm²)
  const calculatePrice = () => {
    const area = (width * height) / 10000 // converter para m²
    const basePrice = area * 890 // R$ 890 por m²
    return Math.round(basePrice + selectedFrame.price)
  }

  const totalPrice = calculatePrice()

  const handleAddToCart = () => {
    if (!selectedPhoto) return

    addItem({
      id: `custom-${selectedPhoto.id}-${width}x${height}-${selectedFrame.name}`,
      name: `Quadro Personalizado - ${selectedPhoto.title}`,
      description: `${width}x${height}cm`,
      price: totalPrice,
      image: selectedPhoto.image,
      size: `${width}x${height}cm`,
      frame: selectedFrame.name,
      type: "custom",
    })
    onClose()
    resetWizard()
  }

  const resetWizard = () => {
    setStep(1)
    setSelectedPhoto(null)
    setSearchQuery("")
    setEnlargedPhoto(null)
    setWidth(50)
    setHeight(50)
  }

  const isValidSize = width <= 115 && height <= 115 && width >= 10 && height >= 10

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
            resetWizard()
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Criar Quadro Personalizado - Passo {step} de 3
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            {/* Passo 1: Escolher Tamanho Personalizado */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-[#5A4A3A] mb-2">Defina o tamanho do seu quadro</h2>
                  <p className="text-[#8B7355]">Escolha as dimensões ideais (máximo 115cm cada lado)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="width" className="text-[#5A4A3A] font-medium">
                        Largura (cm)
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        min="10"
                        max="115"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="border-[#D4B896] focus:border-[#8B9A6B] h-12 text-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="height" className="text-[#5A4A3A] font-medium">
                        Altura (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        min="10"
                        max="115"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="border-[#D4B896] focus:border-[#8B9A6B] h-12 text-lg"
                      />
                    </div>

                    {!isValidSize && (
                      <div className="text-red-600 text-sm">Dimensões devem estar entre 10cm e 115cm</div>
                    )}
                  </div>

                  <div className="bg-[#F5F2ED] p-6 rounded-lg">
                    <h3 className="font-semibold text-[#5A4A3A] mb-4">Resumo</h3>
                    <div className="space-y-2 text-[#8B7355]">
                      <p>
                        Dimensões: {width} x {height} cm
                      </p>
                      <p>Área: {((width * height) / 10000).toFixed(2)} m²</p>
                      <p className="text-xl font-bold text-[#8B9A6B]">Preço estimado: R$ {calculatePrice()}</p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A]"
                  onClick={() => setStep(2)}
                  disabled={!isValidSize}
                >
                  Continuar
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Passo 2: Escolher Foto */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-[#5A4A3A] mb-2">Escolha uma foto do acervo</h2>
                  <p className="text-[#8B7355]">Selecione a imagem perfeita para o seu quadro</p>
                </div>

                {/* Busca */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7355] h-4 w-4" />
                  <Input
                    placeholder="Buscar por local, tema ou palavra-chave..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-[#D4B896] focus:border-[#8B9A6B]"
                  />
                </div>

                {/* Grade de Fotos */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                  {filteredPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPhoto?.id === photo.id
                          ? "border-[#8B9A6B] ring-2 ring-[#8B9A6B]/50"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <p className="text-xs font-medium truncate">{photo.title}</p>
                          <p className="text-xs opacity-80">{photo.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPhoto && (
                  <div className="border rounded-lg p-4 bg-[#F5F2ED]">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={selectedPhoto.image || "/placeholder.svg"}
                          alt={selectedPhoto.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#5A4A3A]">{selectedPhoto.title}</h3>
                        <p className="text-sm text-[#8B7355]">{selectedPhoto.location}</p>
                        <div className="flex gap-1 mt-1">
                          {selectedPhoto.tags.slice(0, 3).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-[#8B9A6B] hover:bg-[#7A8A5A]"
                    onClick={() => setStep(3)}
                    disabled={!selectedPhoto}
                  >
                    Continuar
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Passo 3: Escolher Moldura e Finalizar */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-[#5A4A3A] mb-2">Finalize seu quadro</h2>
                  <p className="text-[#8B7355]">Escolha a moldura e confirme seu pedido</p>
                </div>

                {/* Resumo */}
                {selectedPhoto && (
                  <div className="border rounded-lg p-4 bg-[#F5F2ED]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-20 h-20 rounded overflow-hidden">
                        <Image
                          src={selectedPhoto.image || "/placeholder.svg"}
                          alt={selectedPhoto.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#5A4A3A]">{selectedPhoto.title}</h3>
                        <p className="text-sm text-[#8B7355]">{selectedPhoto.location}</p>
                        <p className="text-sm font-medium text-[#8B9A6B]">
                          {width} x {height} cm
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Molduras */}
                <div className="space-y-3">
                  <h3 className="font-medium text-[#5A4A3A]">Escolha a moldura:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {frames.map((frame) => (
                      <Button
                        key={frame.name}
                        variant={selectedFrame.name === frame.name ? "default" : "outline"}
                        className={`p-3 h-auto flex flex-col ${
                          selectedFrame.name === frame.name
                            ? "bg-[#8B9A6B] hover:bg-[#7A8A5A]"
                            : "border-[#D4B896] hover:bg-[#E6D7C3]"
                        }`}
                        onClick={() => setSelectedFrame(frame)}
                      >
                        <span className="font-medium">{frame.name}</span>
                        <span className="text-sm">{frame.price > 0 ? `+R$ ${frame.price}` : "Grátis"}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-[#5A4A3A]">Total:</span>
                    <span className="text-2xl font-bold text-[#8B9A6B]">R$ {totalPrice}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                  <Button className="flex-1 bg-[#8B9A6B] hover:bg-[#7A8A5A]" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
