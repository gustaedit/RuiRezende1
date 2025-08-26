"use client"
import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Grid3X3, List, X, Star, MapPin, Calendar, Quote, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

interface ClientTestimonial {
  id: string
  clientName: string
  location: string
  productType: string
  productSize: string
  rating: number
  testimonial: string
  date: string
  images: string[]
  verified: boolean
  tags: string[]
}

const clientTestimonials: ClientTestimonial[] = [
  {
    id: "1",
    clientName: "Maria Silva",
    location: "Salvador-BA",
    productType: "Quadro",
    productSize: "80x60cm",
    rating: 5,
    testimonial:
      "Simplesmente perfeito! O quadro chegou exatamente como esperava. A qualidade da impressão é excepcional e a moldura é muito elegante. Ficou lindo na minha sala de estar. Todos que visitam elogiam muito. Rui, você é um artista incrível!",
    date: "2024-01-15",
    images: [
      "/placeholder.svg?height=600&width=800&text=Quadro+na+Sala+Maria",
      "/placeholder.svg?height=400&width=600&text=Detalhe+Quadro+Maria",
      "/placeholder.svg?height=400&width=600&text=Ambiente+Completo+Maria",
    ],
    verified: true,
    tags: ["quadro", "sala", "qualidade", "moldura"],
  },
  {
    id: "2",
    clientName: "João Santos",
    location: "Juazeiro-BA",
    productType: "Foto Digital",
    productSize: "Alta Resolução",
    rating: 5,
    testimonial:
      "Comprei a foto digital do vaqueiro e fiquei emocionado. A imagem tem uma qualidade incrível e captura perfeitamente a essência do nosso sertão. Vou imprimir em vários tamanhos para presentear a família. Obrigado por preservar nossa cultura!",
    date: "2024-01-10",
    images: [
      "/placeholder.svg?height=600&width=800&text=Foto+Digital+João",
      "/placeholder.svg?height=400&width=600&text=Impressão+Casa+João",
    ],
    verified: true,
    tags: ["foto digital", "vaqueiro", "cultura", "sertão"],
  },
  {
    id: "3",
    clientName: "Ana Costa",
    location: "Feira de Santana-BA",
    productType: "Quadro Personalizado",
    productSize: "100x70cm",
    rating: 5,
    testimonial:
      "Encomendei um quadro personalizado da Caatinga para o meu escritório. O resultado superou todas as expectativas! A foto escolhida ficou ainda mais bonita impressa. O atendimento foi excelente e a entrega pontual. Recomendo de olhos fechados!",
    date: "2024-01-08",
    images: [
      "/placeholder.svg?height=600&width=800&text=Escritório+Ana",
      "/placeholder.svg?height=400&width=600&text=Quadro+Caatinga+Ana",
      "/placeholder.svg?height=400&width=600&text=Detalhe+Moldura+Ana",
    ],
    verified: true,
    tags: ["personalizado", "caatinga", "escritório", "atendimento"],
  },
  {
    id: "4",
    clientName: "Carlos Lima",
    location: "Vitória da Conquista-BA",
    productType: "Quadro Panorâmico",
    productSize: "120x40cm",
    rating: 5,
    testimonial:
      "O quadro panorâmico do Rio São Francisco ficou espetacular na parede da sala de jantar. A impressão é nítida e as cores são vibrantes. Minha esposa ficou encantada! É como ter uma janela para o nosso querido Velho Chico.",
    date: "2024-01-05",
    images: [
      "/placeholder.svg?height=400&width=800&text=Panorâmico+Carlos",
      "/placeholder.svg?height=600&width=800&text=Sala+Jantar+Carlos",
    ],
    verified: true,
    tags: ["panorâmico", "rio são francisco", "sala jantar", "cores"],
  },
  {
    id: "5",
    clientName: "Lucia Oliveira",
    location: "Ilhéus-BA",
    productType: "Kit 3 Quadros",
    productSize: "60x40cm cada",
    rating: 5,
    testimonial:
      "Comprei um kit com 3 quadros pequenos para decorar o corredor. Ficaram perfeitos! As fotografias se complementam e criam uma narrativa visual linda. A qualidade é impecável e o preço muito justo. Já estou pensando em comprar mais!",
    date: "2024-01-03",
    images: [
      "/placeholder.svg?height=600&width=800&text=Corredor+Lucia",
      "/placeholder.svg?height=400&width=600&text=Kit+3+Quadros+Lucia",
      "/placeholder.svg?height=400&width=600&text=Detalhe+Kit+Lucia",
    ],
    verified: true,
    tags: ["kit", "corredor", "narrativa", "preço justo"],
  },
  {
    id: "6",
    clientName: "Roberto Alves",
    location: "Camaçari-BA",
    productType: "Quadro Grande",
    productSize: "100x80cm",
    rating: 4,
    testimonial:
      "Quadro lindo da plantação de arroz! Ficou incrível na parede da entrada. A única observação é que demorou um pouco mais que o esperado para chegar, mas valeu a pena esperar. A qualidade compensa tudo!",
    date: "2023-12-28",
    images: [
      "/placeholder.svg?height=600&width=800&text=Entrada+Roberto",
      "/placeholder.svg?height=400&width=600&text=Quadro+Arroz+Roberto",
    ],
    verified: true,
    tags: ["grande", "plantação", "entrada", "qualidade"],
  },
  {
    id: "7",
    clientName: "Fernanda Souza",
    location: "Petrolina-PE",
    productType: "Quadro Quadrado",
    productSize: "50x50cm",
    rating: 5,
    testimonial:
      "Perfeito para o quarto do meu filho! Ele adora a foto do mandacaru florido. Disse que agora tem um pedacinho do sertão no quarto dele. A moldura é resistente e a impressão muito nítida. Parabéns pelo trabalho!",
    date: "2023-12-25",
    images: [
      "/placeholder.svg?height=600&width=800&text=Quarto+Fernanda",
      "/placeholder.svg?height=400&width=600&text=Mandacaru+Quadro",
    ],
    verified: true,
    tags: ["quadrado", "quarto", "mandacaru", "criança"],
  },
  {
    id: "8",
    clientName: "Paulo Mendes",
    location: "Barreiras-BA",
    productType: "Foto Digital + Quadro",
    productSize: "Combo",
    rating: 5,
    testimonial:
      "Comprei a foto digital e depois encomendei o quadro. Excelente negócio! Primeiro pude ver como ficaria em casa com a versão digital, depois fiz o quadro. O resultado é fantástico. Atendimento nota 10!",
    date: "2023-12-20",
    images: [
      "/placeholder.svg?height=600&width=800&text=Combo+Paulo",
      "/placeholder.svg?height=400&width=600&text=Antes+Depois+Paulo",
    ],
    verified: true,
    tags: ["combo", "digital", "teste", "atendimento"],
  },
]

const productTypes = [
  "Todos",
  "Quadro",
  "Foto Digital",
  "Quadro Personalizado",
  "Quadro Panorâmico",
  "Kit 3 Quadros",
  "Quadro Grande",
  "Quadro Quadrado",
  "Combo",
]
const locations = [
  "Todas",
  "Salvador-BA",
  "Juazeiro-BA",
  "Feira de Santana-BA",
  "Vitória da Conquista-BA",
  "Ilhéus-BA",
  "Camaçari-BA",
  "Petrolina-PE",
  "Barreiras-BA",
]

export function ClientTestimonialsPage() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<ClientTestimonial | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProductType, setSelectedProductType] = useState("Todos")
  const [selectedLocation, setSelectedLocation] = useState("Todas")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRating, setSelectedRating] = useState("Todas")

  const filteredTestimonials = useMemo(() => {
    return clientTestimonials.filter((testimonial) => {
      const matchesSearch =
        testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesProductType = selectedProductType === "Todos" || testimonial.productType === selectedProductType
      const matchesLocation = selectedLocation === "Todas" || testimonial.location === selectedLocation
      const matchesRating = selectedRating === "Todas" || testimonial.rating.toString() === selectedRating

      return matchesSearch && matchesProductType && matchesLocation && matchesRating
    })
  }, [searchTerm, selectedProductType, selectedLocation, selectedRating])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const handleWhatsAppContact = (clientName: string) => {
    const message = `Olá Rui! Vi o depoimento da ${clientName} e gostaria de fazer um pedido similar.`
    const whatsappUrl = `https://wa.me/+557199441318?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (


    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#8B9A6B] to-[#7A8A5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cordel font-bold text-white mb-4">
            Nossos Clientes Satisfeitos
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Veja os relatos reais e as fotos dos produtos que nossos clientes receberam. Cada história é única e
            especial para nós.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-white">
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-semibold">{clientTestimonials.length} clientes satisfeitos</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">
                {(clientTestimonials.reduce((acc, t) => acc + t.rating, 0) / clientTestimonials.length).toFixed(1)}{" "}
                estrelas
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros e Busca */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B7355] w-4 h-4" />
              <Input
                placeholder="Buscar por nome, depoimento ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-[#D4B896] focus:border-[#8B9A6B]"
              />
            </div>

            {/* Controles */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Tipo de Produto */}
              <Select value={selectedProductType} onValueChange={setSelectedProductType}>
                <SelectTrigger className="w-48 bg-white border-[#D4B896]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Localização */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48 bg-white border-[#D4B896]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Avaliação */}
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-32 bg-white border-[#D4B896]">
                  <SelectValue placeholder="Estrelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todas">Todas</SelectItem>
                  <SelectItem value="5">5 ⭐</SelectItem>
                  <SelectItem value="4">4 ⭐</SelectItem>
                  <SelectItem value="3">3 ⭐</SelectItem>
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
            <span>{filteredTestimonials.length} depoimentos encontrados</span>
            {(searchTerm ||
              selectedProductType !== "Todos" ||
              selectedLocation !== "Todas" ||
              selectedRating !== "Todas") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedProductType("Todos")
                  setSelectedLocation("Todas")
                  setSelectedRating("Todas")
                }}
                className="text-[#8B7355] hover:text-[#8B9A6B]"
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </div>

        {/* Testimonials Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={testimonial.images[0] || "/placeholder.svg"}
                    alt={`Produto de ${testimonial.clientName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 right-2">
                    {testimonial.verified && <Badge className="bg-green-500 text-white text-xs">✓ Verificado</Badge>}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-[#8B9A6B] text-white text-xs">{testimonial.productType}</Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[#5A4A3A]">{testimonial.clientName}</h3>
                    <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                  </div>

                  <p className="text-xs text-[#8B7355] mb-2 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {testimonial.location}
                  </p>

                  <p className="text-sm text-[#5A4A3A] line-clamp-3 mb-3">"{testimonial.testimonial}"</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {testimonial.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {testimonial.tags.length > 2 && (
                      <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] text-xs">
                        +{testimonial.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#8B7355]">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(testimonial.date).toLocaleDateString("pt-BR")}
                    </span>
                    <span>{testimonial.productSize}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image
                          src={testimonial.images[0] || "/placeholder.svg"}
                          alt={`Produto de ${testimonial.clientName}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-[#5A4A3A] mb-1">{testimonial.clientName}</h3>
                          <p className="text-sm text-[#8B7355] flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {testimonial.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                          {testimonial.verified && (
                            <Badge className="bg-green-500 text-white text-xs">✓ Verificado</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-[#8B7355]">
                        <Badge className="bg-[#8B9A6B] text-white">{testimonial.productType}</Badge>
                        <span>{testimonial.productSize}</span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(testimonial.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>

                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-[#8B9A6B] opacity-50" />
                        <p className="text-[#5A4A3A] pl-4 italic">"{testimonial.testimonial}"</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {testimonial.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#8B7355] mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhum depoimento encontrado</p>
              <p className="text-sm">Tente ajustar os filtros ou termos de busca</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedProductType("Todos")
                setSelectedLocation("Todas")
                setSelectedRating("Todas")
              }}
              className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white"
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#8B9A6B] to-[#7A8A5A] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Quer fazer parte desta galeria?</h2>
          <p className="text-lg mb-6 opacity-90">Faça seu pedido e compartilhe sua experiência conosco!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-[#8B9A6B] hover:bg-gray-100"
              onClick={() =>
                window.open(
                  "https://wa.me/+557199441318?text=Olá! Gostaria de fazer um pedido após ver os depoimentos dos clientes.",
                  "_blank",
                )
              }
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Fazer Pedido
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#8B9A6B] bg-transparent"
              onClick={() => document.getElementById("acervo")?.scrollIntoView({ behavior: "smooth" })}
            >
               <Link href="/acervo">
                      Ver Acervo 
                      </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{selectedTestimonial.clientName}</span>
                  {selectedTestimonial.verified && (
                    <Badge className="bg-green-500 text-white text-xs">✓ Verificado</Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedTestimonial(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 p-6">
              {/* Galeria de Imagens */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedTestimonial.images.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Foto ${index + 1} de ${selectedTestimonial.clientName}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>

              {/* Informações do Cliente */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#5A4A3A] mb-2">{selectedTestimonial.clientName}</h2>
                    <div className="space-y-2 text-[#8B7355]">
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <strong>Local:</strong> {selectedTestimonial.location}
                      </p>
                      <p className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <strong>Data:</strong> {new Date(selectedTestimonial.date).toLocaleDateString("pt-BR")}
                      </p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        <strong>Avaliação:</strong>
                        <div className="flex items-center gap-1 ml-2">{renderStars(selectedTestimonial.rating)}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-[#5A4A3A] mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedTestimonial.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-[#F5F2ED]">
                    <h3 className="font-semibold text-[#5A4A3A] mb-3">Detalhes do Produto</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#8B7355]">Tipo:</span>
                        <Badge className="bg-[#8B9A6B] text-white">{selectedTestimonial.productType}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B7355]">Tamanho:</span>
                        <span className="font-medium text-[#5A4A3A]">{selectedTestimonial.productSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-[#25D366] hover:bg-[#20B954] text-white"
                      onClick={() => handleWhatsAppContact(selectedTestimonial.clientName)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Fazer Pedido Similar
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-transparent"
                      onClick={() => document.getElementById("acervo")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        <Link href="/acervo">
                      Ver Acervo Completo
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Depoimento Completo */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-[#5A4A3A] mb-3 flex items-center">
                  <Quote className="w-5 h-5 mr-2" />
                  Depoimento Completo
                </h3>
                <div className="bg-[#F5F2ED] rounded-lg p-6 relative">
                  <Quote className="absolute top-4 left-4 w-8 h-8 text-[#8B9A6B] opacity-30" />
                  <p className="text-[#5A4A3A] italic text-lg leading-relaxed pl-8">
                    "{selectedTestimonial.testimonial}"
                  </p>
                  <div className="mt-4 text-right">
                    <p className="text-[#8B7355] font-medium">
                      — {selectedTestimonial.clientName}, {selectedTestimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
