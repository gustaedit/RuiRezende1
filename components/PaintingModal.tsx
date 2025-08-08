"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

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

interface PaintingModalProps {
  painting: Painting | null
  isOpen: boolean
  onClose: () => void
}

export function PaintingModal({ painting, isOpen, onClose }: PaintingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!painting) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    // Aqui você pode adicionar a lógica real de envio
    alert(`${painting.title} enviado com sucesso!`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="sr-only">{painting.title}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 p-6">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src={painting.image || "/placeholder.svg"}
                alt={painting.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                  {painting.theme}
                </Badge>
                <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                  {painting.location}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-light text-[#5A4A3A] mb-2">{painting.title}</h1>
              <p className="text-[#8B7355]">{painting.material}</p>
            </div>

            <div className="border-t border-[#D4B896] pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-[#5A4A3A]">Total:</span>
                <span className="text-2xl font-bold text-[#8B9A6B]">{painting.price}</span>
              </div>
              <Button
                className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A] text-white"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Comprar agora"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
