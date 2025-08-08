"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Search, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { useCart } from "@/hooks/useCart"
import { photos } from "@/data"
import { Label } from "@/components/ui/label"

interface CustomPaintingWizardProps {
  isOpen: boolean
  onClose: () => void
  preselectedPhoto?: any
}

const frames = [
  { name: "Sem moldura", price: 0 },
  { name: "Moldura natural", price: 120 },
  { name: "Moldura branca", price: 120 },
  { name: "Moldura preta", price: 120 },
]

const sizeOptions = [
  { name: "Quadrado 4x4", width: 40, height: 40, description: "40x40cm" },
  { name: "Original 6x4", width: 60, height: 40, description: "60x40cm" },
  { name: "Panorâmico 12x4", width: 120, height: 40, description: "120x40cm" },
  { name: "Personalizado", width: 50, height: 50, description: "Escolha suas dimensões" },
]

export function CustomPaintingWizard({ isOpen, onClose, preselectedPhoto }: CustomPaintingWizardProps) {
  const [step, setStep] = useState(1)
  const [customWidth, setCustomWidth] = useState(50)
  const [customHeight, setCustomHeight] = useState(50)
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0])
  const [selectedPhoto, setSelectedPhoto] = useState<any>(preselectedPhoto || null)
  const [selectedFrame, setSelectedFrame] = useState(frames[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [enlargedPhoto, setEnlargedPhoto] = useState<any>(null)
  const { addItem } = useCart()

  const isValidCustomSize = customWidth <= 115 && customHeight <= 115 && customWidth >= 10 && customHeight >= 10

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const totalPrice = selectedSize.name === "Personalizado"
    ? Math.round(((customWidth * customHeight) / 10000) * 890) + selectedFrame.price
    : Math.round(((selectedSize.width * selectedSize.height) / 10000) * 890) + selectedFrame.price

  const handleAddToCart = () => {
    if (!selectedPhoto) return

    const finalWidth = selectedSize.name === "Personalizado" ? customWidth : selectedSize.width
    const finalHeight = selectedSize.name === "Personalizado" ? customHeight : selectedSize.height

    addItem({
      id: `custom-${selectedPhoto.id}-${finalWidth}x${finalHeight}-${selectedFrame.name}`,
      name: `Quadro Personalizado - ${selectedPhoto.title}`,
      description: `${finalWidth}x${finalHeight}cm`,
      price: totalPrice,
      image: selectedPhoto.image,
      size: `${finalWidth}x${finalHeight}cm`,
      frame: selectedFrame.name,
      type: "custom",
    })
    onClose()
    resetWizard()
  }

  const resetWizard = () => {
    setStep(1)
    setSelectedPhoto(preselectedPhoto || null)
    setSearchQuery("")
    setEnlargedPhoto(null)
    setSelectedSize(sizeOptions[0])
    setCustomWidth(50)
    setCustomHeight(50)
    setSelectedFrame(frames[0])
  }

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
            {/* Passo 1: Escolher Tamanho */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-[#5A4A3A] mb-2">Escolha o tamanho do seu quadro</h2>
                  <p className="text-[#8B7355]">Selecione uma das opções ou personalize as dimensões</p>
                </div>

                <div className="grid gap-4">
                  {sizeOptions.map((option) => (
                    <Button
                      key={option.name}
                      variant={selectedSize.name === option.name ? "default" : "outline"}
                      className={`p-6 h-auto flex justify-between ${
                        selectedSize.name === option.name
                          ? "bg-[#8B9A6B] hover:bg-[#7A8A5A]"
                          : "border-[#D4B896] hover:bg-[#E6D7C3]"
                      }`}
                      onClick={() => setSelectedSize(option)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm opacity-80">{option.description}</div>
                      </div>
                      <div className="font-bold">
                        {option.name === "Personalizado"
                          ? "A calcular"
                          : `R$ ${Math.round(((option.width * option.height) / 10000) * 890)}`
                        }
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Campos personalizados quando "Personalizado" está selecionado */}
                {selectedSize.name === "Personalizado" && (
                  <div className="bg-[#F5F2ED] p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-[#5A4A3A]">Defina as dimensões personalizadas</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="custom-width" className="text-[#5A4A3A] font-medium">
                          Largura (cm)
                        </Label>
                        <Input
                          id="custom-width"
                          type="number"
                          min="10"
                          max="115"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(Number(e.target.value))}
                          className="border-[#D4B896] focus:border-[#8B9A6B] h-12 text-lg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="custom-height" className="text-[#5A4A3A] font-medium">
                          Altura (cm)
                        </Label>
                        <Input
                          id="custom-height"
                          type="number"
                          min="10"
                          max="115"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(Number(e.target.value))}
                          className="border-[#D4B896] focus:border-[#8B9A6B] h-12 text-lg"
                        />
                      </div>
                    </div>

                    {(!isValidCustomSize) && (
                      <div className="text-red-600 text-sm">Dimensões devem estar entre 10cm e 115cm</div>
                    )}

                    <div className="bg-white p-4 rounded border">
                      <div className="space-y-2 text-[#8B7355]">
                        <p>Dimensões: {customWidth} x {customHeight} cm</p>
                        <p>Área: {((customWidth * customHeight) / 10000).toFixed(2)} m²</p>
                        <p className="text-xl font-bold text-[#8B9A6B]">
                          Preço: R$ {Math.round(((customWidth * customHeight) / 10000) * 890)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A]"
                  onClick={() => setStep(preselectedPhoto ? 3 : 2)}
                  disabled={selectedSize.name === "Personalizado" && !isValidCustomSize}
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
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEnlargedPhoto(photo)
                        }}
                      >
                        Ver
                      </Button>
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
                          {selectedSize.name === "Personalizado"
                            ? `${customWidth} x ${customHeight} cm`
                            : `${selectedSize.width} x ${selectedSize.height} cm`
                          }
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
                    <span className="text-2xl font-bold text-[#8B9A6B]">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(preselectedPhoto ? 1 : 2)} className="flex-1">
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

      {/* Modal de Foto Ampliada */}
      {enlargedPhoto && (
        <Dialog open={!!enlargedPhoto} onOpenChange={() => setEnlargedPhoto(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {enlargedPhoto.title}
                <Button variant="ghost" size="icon" onClick={() => setEnlargedPhoto(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="relative aspect-square">
              <Image
                src={enlargedPhoto.image || "/placeholder.svg"}
                alt={enlargedPhoto.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[#8B7355]">
                <strong>Local:</strong> {enlargedPhoto.location}
              </p>
              <p className="text-[#8B7355]">
                <strong>Categoria:</strong> {enlargedPhoto.category}
              </p>
              <div className="flex gap-1">
                {enlargedPhoto.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A]"
              onClick={() => {
                setSelectedPhoto(enlargedPhoto)
                setEnlargedPhoto(null)
              }}
            >
              Usar esta foto
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
