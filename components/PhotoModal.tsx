"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, Download, Palette } from "lucide-react"
import { useCart } from "@/hooks/useCart"

interface Photo {
  id: string
  title: string
  location: string
  category: string
  tags: string[]
  image: string
}

interface PhotoModalProps {
  photo: Photo | null
  isOpen: boolean
  onClose: () => void
  onCreatePainting?: (photo: Photo) => void
}

export function PhotoModal({ photo, isOpen, onClose, onCreatePainting }: PhotoModalProps) {
  const { addItem } = useCart()

  if (!photo) return null

  const handleBuyDigital = () => {
    addItem({
      id: `photo-${photo.id}`,
      name: `Foto Digital - ${photo.title}`,
      description: "Resolução alta para uso pessoal",
      price: 25.0,
      image: photo.image,
      type: "photo",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {photo.title}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Imagem Principal */}
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={photo.image || "/placeholder.svg"}
              alt={photo.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>

          {/* Informações */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-[#5A4A3A] mb-2">{photo.title}</h2>
                <p className="text-[#8B7355]">
                  <strong>Local:</strong> {photo.location}
                </p>
                <p className="text-[#8B7355]">
                  <strong>Categoria:</strong> {photo.category}
                </p>
                <p className="text-[#8B7355]">
                  <strong>Resolução:</strong> 6000x4000px (24MP)
                </p>
                <p className="text-[#8B7355]">
                  <strong>Data:</strong> 2023
                </p>
              </div>

              <div>
                <h3 className="font-medium text-[#5A4A3A] mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-1">
                  {photo.tags.map((tag) => (
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
                  <div className="flex items-center justify-between p-3 border rounded bg-white">
                    <div>
                      <p className="font-medium text-[#5A4A3A]">Foto Digital</p>
                      <p className="text-sm text-[#8B7355]">Alta resolução para uso pessoal</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#8B9A6B]">R$ 25,00</p>
                      <Button size="sm" className="bg-[#8B9A6B] hover:bg-[#7A8A5A]" onClick={handleBuyDigital}>
                        <Download className="h-3 w-3 mr-1" />
                        Comprar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded bg-white">
                    <div>
                      <p className="font-medium text-[#5A4A3A]">Quadro Personalizado</p>
                      <p className="text-sm text-[#8B7355]">Crie um quadro com esta foto</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#8B9A6B]">A partir de R$ 890</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-white"
                        onClick={() => {
                          onCreatePainting?.(photo)
                          onClose()
                        }}
                      >
                        <Palette className="h-3 w-3 mr-1" />
                        Criar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
