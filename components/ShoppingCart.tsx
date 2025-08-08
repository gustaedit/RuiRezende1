"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/useCart"

export function ShoppingCartIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(true)}
        aria-label={`Carrinho com ${getTotalItems()} itens`}
      >
        <ShoppingCart className="h-5 w-5" />
        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#8B9A6B] text-xs">
            {getTotalItems()}
          </Badge>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Carrinho de Compras
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#5A4A3A]">{item.name}</h3>
                    <p className="text-sm text-[#8B7355]">{item.description}</p>
                    {item.size && <p className="text-xs text-[#8B7355]">Tamanho: {item.size}</p>}
                    {item.frame && <p className="text-xs text-[#8B7355]">Moldura: {item.frame}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-[#8B9A6B]">R$ {item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 bg-transparent"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-[#8B9A6B]">R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={clearCart} className="flex-1 bg-transparent">
                    Limpar Carrinho
                  </Button>
                  <Button className="flex-1 bg-[#8B9A6B] hover:bg-[#7A8A5A]">Finalizar Compra</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
