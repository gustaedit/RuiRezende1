"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { X, Search, Crop, ZoomIn, ZoomOut, Move } from "lucide-react"
import { photos } from "@/data"

interface PhotoCropModalProps {
  isOpen: boolean
  onClose: () => void
  onPhotoSelect: (photo: any, cropData: any) => void
  frameRatio: number // largura/altura do quadro
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export function PhotoCropModal({ isOpen, onClose, onPhotoSelect, frameRatio }: PhotoCropModalProps) {
  const [step, setStep] = useState<"select" | "crop">("select")
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handlePhotoSelect = (photo: any) => {
    setSelectedPhoto(photo)
    setStep("crop")
    // Inicializar área de crop baseada na proporção do quadro
    const cropWidth = 200
    const cropHeight = cropWidth / frameRatio
    setCropArea({
      x: 50,
      y: 50,
      width: cropWidth,
      height: cropHeight,
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      setCropArea((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(400 - prev.width, prev.x + deltaX)),
        y: Math.max(0, Math.min(400 - prev.height, prev.y + deltaY)),
      }))

      setDragStart({ x: e.clientX, y: e.clientY })
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Event listeners para mouse
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleCropConfirm = () => {
    if (selectedPhoto) {
      onPhotoSelect(selectedPhoto, {
        cropArea,
        zoom,
        frameRatio,
      })
      onClose()
      resetModal()
    }
  }

  const resetModal = () => {
    setStep("select")
    setSelectedPhoto(null)
    setSearchQuery("")
    setCropArea({ x: 0, y: 0, width: 100, height: 100 })
    setZoom(1)
  }

  const adjustCropToRatio = () => {
    const newHeight = cropArea.width / frameRatio
    setCropArea((prev) => ({
      ...prev,
      height: Math.min(newHeight, 400 - prev.y),
    }))
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          resetModal()
        }
      }}
    >
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {step === "select" ? "Escolha uma foto do acervo" : "Recorte sua foto"}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {step === "select" && (
            <div className="space-y-6">
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
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-[#8B9A6B] transition-all"
                    onClick={() => handlePhotoSelect(photo)}
                  >
                    <Image
                      src={photo.image || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 33vw, 20vw"
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
            </div>
          )}

          {step === "crop" && selectedPhoto && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Área de Crop */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#5A4A3A]">Recorte sua foto</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                        <ZoomOut className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(3, zoom + 0.1))}>
                        <ZoomIn className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div
                    ref={containerRef}
                    className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border-2 border-[#D4B896]"
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                  >
                    {/* Imagem de fundo */}
                    <div
                      className="absolute inset-0"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "center",
                      }}
                    >
                      <Image
                        ref={imageRef}
                        src={selectedPhoto.image || "/placeholder.svg"}
                        alt={selectedPhoto.title}
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    </div>

                    {/* Overlay escuro */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Área de crop */}
                    <div
                      className="absolute border-2 border-white bg-transparent cursor-move"
                      style={{
                        left: `${cropArea.x}px`,
                        top: `${cropArea.y}px`,
                        width: `${cropArea.width}px`,
                        height: `${cropArea.height}px`,
                        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                      }}
                      onMouseDown={handleMouseDown}
                    >
                      {/* Handles de redimensionamento */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-[#8B9A6B] cursor-nw-resize" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-[#8B9A6B] cursor-ne-resize" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-[#8B9A6B] cursor-sw-resize" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-[#8B9A6B] cursor-se-resize" />

                      {/* Ícone de movimento no centro */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                        <Move className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Controles */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-[#5A4A3A]">Zoom:</label>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-[#8B7355]">{Math.round(zoom * 100)}%</span>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={adjustCropToRatio}
                      className="w-full border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-transparent"
                    >
                      <Crop className="h-3 w-3 mr-2" />
                      Ajustar à proporção do quadro
                    </Button>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#5A4A3A]">Preview do quadro</h3>

                  <div className="bg-[#F5F2ED] rounded-lg p-6 flex items-center justify-center">
                    <div
                      className="bg-white shadow-lg border-8 border-[#8B7355] relative overflow-hidden"
                      style={{
                        width: "200px",
                        height: `${200 / frameRatio}px`,
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${selectedPhoto.image})`,
                          backgroundSize: `${400 * zoom}px ${400 * zoom}px`,
                          backgroundPosition: `-${cropArea.x * zoom}px -${cropArea.y * zoom}px`,
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-[#8B7355]">
                    <p>
                      <strong>Foto:</strong> {selectedPhoto.title}
                    </p>
                    <p>
                      <strong>Local:</strong> {selectedPhoto.location}
                    </p>
                    <p>
                      <strong>Área selecionada:</strong> {cropArea.width}x{cropArea.height}px
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
                  Voltar
                </Button>
                <Button className="flex-1 bg-[#8B9A6B] hover:bg-[#7A8A5A]" onClick={handleCropConfirm}>
                  Usar esta foto
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
