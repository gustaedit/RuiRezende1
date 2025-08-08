"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, Star } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  longDescription: string
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!product) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    // Aqui você pode adicionar a lógica real de envio
    alert(`${product.name} enviado com sucesso!`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-[#F5F2ED]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="aspect-square object-cover w-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="overflow-hidden rounded-lg border bg-[#F5F2ED]">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt={`${product.name} - Imagem ${i}`}
                    width={120}
                    height={120}
                    className="aspect-square object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                {product.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-light text-[#5A4A3A]">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#8B7355]">(12 avaliações)</span>
              </div>
              <p className="text-2xl font-bold text-[#8B9A6B]">R$ {product.price.toFixed(2)}</p>
            </div>

            <p className="text-[#8B7355] leading-relaxed">{product.description}</p>

            <div className="space-y-4">
              {/* Botão de Enviar */}
              <Button
                className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A] text-white"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Comprar agora"}
              </Button>
            </div>

            {/* Product Information Tabs */}
            <div className="border-t border-[#D4B896] pt-6">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#E6D7C3]">
                  <TabsTrigger value="description" className="data-[state=active]:bg-white">
                    Descrição
                  </TabsTrigger>
                  <TabsTrigger value="details" className="data-[state=active]:bg-white">
                    Detalhes
                  </TabsTrigger>
                  <TabsTrigger value="shipping" className="data-[state=active]:bg-white">
                    Envio
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-4">
                  <p className="text-sm text-[#8B7355] leading-relaxed">{product.longDescription}</p>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <ul className="list-disc pl-4 text-sm text-[#8B7355] space-y-1">
                    <li>Dimensões: 30cm x 25cm</li>
                    <li>Páginas: 120-180</li>
                    <li>Papel: Couché fosco 150g</li>
                    <li>Acabamento: Capa dura com sobrecapa</li>
                    <li>Idioma: Português</li>
                    <li>Fotógrafo: Rui Rezende</li>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="pt-4">
                  <div className="space-y-2 text-sm text-[#8B7355]">
                    <p>📦 Enviamos para todo o Brasil</p>
                    <p>🚚 Prazo: 3 a 10 dias úteis</p>
                    <p>🆓 Frete grátis para compras acima de R$ 250,00</p>
                    <p>📍 Rastreamento incluído</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
