"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Heart, Share2 } from "lucide-react"
import { useCart } from "@/hooks/useCart"

interface ProductPageProps {
  product: any
  type: "livro" | "quadro"
  relatedProducts: any[]
}

export function ProductPage({ product, type, relatedProducts }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: type === "livro" ? product.name : product.title,
      price: type === "livro" ? product.price : Number.parseFloat(product.price.replace("R$ ", "").replace(".", "")),
      image: product.image,
      type: type,
      quantity: 1,
    }
    addToCart(cartItem)
  }

  const productImages = [product.image, product.image, product.image] // Simular múltiplas imagens

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Header com botão voltar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-[#5A4A3A] hover:text-[#8B9A6B] transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Galeria de imagens */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={type === "livro" ? product.name : product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Miniaturas */}
            <div className="flex gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-[#8B9A6B]" : "border-gray-200"
                  }`}
                >
                  <Image src={image || "/placeholder.svg"} alt={`Imagem ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                  {type === "livro" ? "Livro" : "Quadro"}
                </Badge>
                {type === "quadro" && (
                  <>
                    <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                      {product.theme}
                    </Badge>
                    <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                      {product.location}
                    </Badge>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-4">
                {type === "livro" ? product.name : product.title}
              </h1>

              <p className="text-lg text-[#8B7355] mb-6">
                {type === "livro" ? product.description : `Quadro Fine Art - ${product.theme} da ${product.location}`}
              </p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#5A4A3A] mb-4">Características</h3>
              <div className="space-y-3">
                {type === "livro" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Categoria:</span>
                      <span className="font-medium text-[#5A4A3A]">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Páginas:</span>
                      <span className="font-medium text-[#5A4A3A]">120 páginas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Formato:</span>
                      <span className="font-medium text-[#5A4A3A]">21x28 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Acabamento:</span>
                      <span className="font-medium text-[#5A4A3A]">Capa dura</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Dimensões:</span>
                      <span className="font-medium text-[#5A4A3A]">{product.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Material:</span>
                      <span className="font-medium text-[#5A4A3A]">{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Tema:</span>
                      <span className="font-medium text-[#5A4A3A]">{product.theme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B7355]">Localização:</span>
                      <span className="font-medium text-[#5A4A3A]">{product.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Preço e ações */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-[#8B9A6B]">
                    {type === "livro" ? `R$ ${product.price.toFixed(2)}` : product.price}
                  </span>
                  <p className="text-sm text-[#8B7355] mt-1">À vista no PIX ou em até 12x sem juros</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-[#8B9A6B] hover:bg-[#7A8A5A] text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao carrinho
                </Button>

                <Button size="lg" variant="outline" className="border-[#8B9A6B] text-[#5A4A3A] bg-transparent">
                  <Heart className="h-5 w-5" />
                </Button>

                <Button size="lg" variant="outline" className="border-[#8B9A6B] text-[#5A4A3A] bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição detalhada */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-12">
          <h3 className="text-2xl font-semibold text-[#5A4A3A] mb-4">
            Sobre {type === "livro" ? "o livro" : "o quadro"}
          </h3>
          <div className="prose prose-lg max-w-none text-[#8B7355]">
            <p>
              {type === "livro"
                ? product.longDescription ||
                  `${product.description} Este livro representa uma jornada única pela Caatinga, capturando a essência e a beleza do sertão brasileiro através do olhar sensível de Rui Rezende. Cada página revela histórias, paisagens e personagens que compõem o rico mosaico cultural desta região única.`
                : `Este quadro Fine Art faz parte da coleção exclusiva de Rui Rezende, capturando a essência da ${product.location}. A obra "${product.title}" representa ${product.theme.toLowerCase()}, mostrando a beleza única da Caatinga através de uma perspectiva artística refinada. Produzido em ${product.material}, este quadro é uma peça única que traz para seu ambiente toda a riqueza visual e cultural do sertão brasileiro.`}
            </p>
          </div>
        </div>

        {/* Produtos relacionados */}
        <div>
          <h3 className="text-2xl font-semibold text-[#5A4A3A] mb-8 text-center">
            {type === "livro" ? "Outros livros que você pode gostar" : "Outros quadros da coleção"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white"
              >
                <CardContent className="p-0">
                  <Link href={`/produto/${type}/${relatedProduct.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={type === "livro" ? relatedProduct.name : relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="280px"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#5A4A3A] mb-2 line-clamp-2">
                        {type === "livro" ? relatedProduct.name : relatedProduct.title}
                      </h4>
                      <p className="text-sm text-[#8B7355] mb-3 line-clamp-2">
                        {type === "livro"
                          ? relatedProduct.description
                          : `${relatedProduct.theme} - ${relatedProduct.location}`}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#8B9A6B]">
                          {type === "livro" ? `R$ ${relatedProduct.price.toFixed(2)}` : relatedProduct.price}
                        </span>
                        <Button size="sm" className="bg-[#8B9A6B] hover:bg-[#7A8A5A]">
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
