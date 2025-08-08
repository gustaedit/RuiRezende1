"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function CustomFrameCreator() {
  const [width, setWidth] = useState([60]) // em cm
  const [height, setHeight] = useState([40]) // em cm
  const [price, setPrice] = useState(0)

  // Função para calcular o preço baseado na área
  const calculatePrice = (w: number, h: number) => {
    const area = (w * h) / 10000 // área em m²
    const basePrice = 150 // preço base por m²
    const calculatedPrice = area * basePrice
    return Math.round(calculatedPrice / 10) * 10 // arredonda para múltiplos de 10
  }

  useEffect(() => {
    setPrice(calculatePrice(width[0], height[0]))
  }, [width, height])

  const handleWidthChange = (value: string) => {
    const numValue = Math.min(115, Math.max(20, parseInt(value) || 20))
    setWidth([numValue])
  }

  const handleHeightChange = (value: string) => {
    const numValue = Math.min(115, Math.max(20, parseInt(value) || 20))
    setHeight([numValue])
  }

  return (
    <section id="criar-quadro-personalizado" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cordel font-bold text-[#5A4A3A] mb-4">
            Crie seu Quadro Personalizado
          </h2>
          <p className="text-sm sm:text-base text-[#8B7355] max-w-2xl mx-auto">
            Escolha as dimensões perfeitas para seu espaço. Tamanho máximo: 115cm
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Visualização */}
          <div className="space-y-6">
            <div className="bg-[#F5F2ED] rounded-lg p-6 flex items-center justify-center min-h-[300px]">
              <div 
                className="bg-white shadow-lg border-8 border-[#8B7355] relative"
                style={{
                  width: `${Math.min(250, (width[0] / 115) * 250)}px`,
                  height: `${Math.min(250, (height[0] / 115) * 250)}px`,
                }}
              >
                <div className="absolute inset-2 bg-gradient-to-br from-[#8B9A6B]/20 to-[#5A4A3A]/20 flex items-center justify-center">
                  <span className="text-xs text-[#5A4A3A] font-medium">Sua Foto</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-[#5A4A3A]">
                Dimensões: {width[0]}cm × {height[0]}cm
              </p>
              <p className="text-sm text-[#8B7355]">
                Área: {((width[0] * height[0]) / 10000).toFixed(2)}m²
              </p>
            </div>
          </div>

          {/* Controles */}
          <div className="space-y-6">
            {/* Largura */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-[#5A4A3A]">
                Largura: {width[0]}cm
              </Label>
              <Slider
                value={width}
                onValueChange={setWidth}
                max={115}
                min={20}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={width[0]}
                onChange={(e) => handleWidthChange(e.target.value)}
                min={20}
                max={115}
                className="w-full"
                placeholder="Largura em cm"
              />
            </div>

            {/* Altura */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-[#5A4A3A]">
                Altura: {height[0]}cm
              </Label>
              <Slider
                value={height}
                onValueChange={setHeight}
                max={115}
                min={20}
                step={1}
                className="w-full"
              />
              <Input
                type="number"
                value={height[0]}
                onChange={(e) => handleHeightChange(e.target.value)}
                min={20}
                max={115}
                className="w-full"
                placeholder="Altura em cm"
              />
            </div>

            {/* Preço */}
            <div className="bg-[#F5F2ED] rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm text-[#8B7355] mb-1">Preço estimado:</p>
                <p className="text-3xl font-bold text-[#8B9A6B]">R$ {price}</p>
              </div>
            </div>

            {/* Tamanhos Pré-definidos */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-[#5A4A3A]">
                Ou escolha um tamanho padrão:
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setWidth([40]); setHeight([40]) }}
                  className="text-xs border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white"
                >
                  Quadrado 40×40
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setWidth([60]); setHeight([40]) }}
                  className="text-xs border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white"
                >
                  Original 60×40
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setWidth([80]); setHeight([60]) }}
                  className="text-xs border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white"
                >
                  Médio 80×60
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setWidth([100]); setHeight([70]) }}
                  className="text-xs border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white"
                >
                  Grande 100×70
                </Button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A] text-white py-3">
                Criar Quadro - R$ {price}
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white py-3 bg-transparent"
              >
                Salvar Configuração
              </Button>
            </div>

            {/* Informações */}
            <div className="bg-white border border-[#D4B896] rounded-lg p-4">
              <h4 className="font-semibold text-[#5A4A3A] mb-2 text-sm">Incluso no preço:</h4>
              <ul className="text-xs text-[#8B7355] space-y-1">
                <li>• Impressão em alta qualidade</li>
                <li>• Moldura premium</li>
                <li>• Vidro protetor</li>
                <li>• Sistema de fixação</li>
                <li>• Frete grátis para BA</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
