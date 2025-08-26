"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Grid, List, X } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { books, paintings, photos } from "@/data"

interface FilterState {
  categoria: string[]
  tamanho: string[]
  preco: string
}

export function PesquisaContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categoria: [],
    tamanho: [],
    preco: "",
  })

  // Combinar todos os itens para busca
  const allItems = useMemo(() => {
    const bookItems = books.map((book) => ({
      ...book,
      type: "book" as const,
      searchText: `${book.name} ${book.description} ${book.category}`.toLowerCase(),
    }))

    const paintingItems = paintings.map((painting) => ({
      ...painting,
      type: "painting" as const,
      searchText: `${painting.title} ${painting.theme} ${painting.location}`.toLowerCase(),
    }))

    const photoItems = photos.map((photo) => ({
      ...photo,
      type: "photo" as const,
      searchText: `${photo.title} ${photo.location} ${photo.category} ${photo.tags.join(" ")}`.toLowerCase(),
    }))

    return [...bookItems, ...paintingItems, ...photoItems]
  }, [])

  // Filtrar itens baseado na busca e filtros
  const filteredItems = useMemo(() => {
    let items = allItems

    // Filtro por texto de busca
    if (searchQuery) {
      items = items.filter((item) => item.searchText.includes(searchQuery.toLowerCase()))
    }

    // Filtro por tipo (aba ativa)
    if (activeTab !== "todos") {
      items = items.filter((item) => item.type === activeTab)
    }

    // Filtros adicionais
    if (filters.categoria.length > 0) {
      items = items.filter((item) => {
        if (item.type === "book") return filters.categoria.includes(item.category)
        if (item.type === "painting") return filters.categoria.includes(item.theme)
        if (item.type === "photo") return filters.categoria.includes(item.category)
        return true
      })
    }

    return items
  }, [allItems, searchQuery, activeTab, filters])

  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    if (filterType === "preco") {
      setFilters((prev) => ({ ...prev, [filterType]: prev[filterType] === value ? "" : value }))
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter((item) => item !== value)
          : [...prev[filterType], value],
      }))
    }
  }

  const clearFilters = () => {
    setFilters({ categoria: [], tamanho: [], preco: "" })
  }

  const renderItem = (item: any) => {
    if (viewMode === "list") {
      return (
        <Card key={`${item.type}-${item.id}`} className="border-0 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title || item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="bg-[#E6D7C3] text-[#5A4A3A] mb-2">
                      {item.type === "book" ? "Livro" : item.type === "painting" ? "Quadro" : "Foto"}
                    </Badge>
                    <h3 className="font-semibold text-[#5A4A3A] mb-1">{item.title || item.name}</h3>
                    <p className="text-sm text-[#8B7355] mb-2">{item.description || item.location}</p>
                    {item.type === "photo" && (
                      <div className="flex gap-1">
                        {item.tags?.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    {item.price && (
                      <p className="font-bold text-[#8B9A6B] mb-2">
                        {typeof item.price === "number" ? `R$ ${item.price.toFixed(2)}` : item.price}
                      </p>
                    )}
                    <Button size="sm" className="bg-[#8B9A6B] hover:bg-[#7A8A5A]">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card key={`${item.type}-${item.id}`} className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title || item.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 text-[#5A4A3A]">
                {item.type === "book" ? "Livro" : item.type === "painting" ? "Quadro" : "Foto"}
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-[#5A4A3A] mb-1 line-clamp-1">{item.title || item.name}</h3>
            <p className="text-sm text-[#8B7355] mb-2 line-clamp-1">{item.description || item.location}</p>
            <div className="flex items-center justify-between">
              {item.price && (
                <span className="font-bold text-[#8B9A6B]">
                  {typeof item.price === "number" ? `R$ ${item.price.toFixed(2)}` : item.price}
                </span>
              )}
              <Button size="sm" className="bg-[#8B9A6B] hover:bg-[#7A8A5A]">
                Ver
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-sertao text-[#5A4A3A] mb-4">Acervo</h1>
            <p className="text-[#8B7355] text-lg">Encontre livros, quadros e fotos do acervo</p>
          </header>

          {/* Barra de Pesquisa */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7355] h-5 w-5" />
            <Input
              placeholder="Pesquisar por nome, tema, local..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg border-[#D4B896] focus:border-[#8B9A6B]"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filtros Laterais */}
            <aside className="lg:w-64 space-y-4">
              <div className="flex items-center justify-between lg:hidden">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="border-[#D4B896]">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
                <Card className="border-[#D4B896]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#5A4A3A]">Filtros</h3>
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-[#5A4A3A] mb-2">Categoria</h4>
                        <div className="space-y-1">
                          {["Paisagens", "Cultura", "Natureza", "Arte", "Movimento"].map((categoria) => (
                            <label key={categoria} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.categoria.includes(categoria)}
                                onChange={() => toggleFilter("categoria", categoria)}
                                className="rounded border-[#D4B896]"
                              />
                              <span className="text-sm text-[#8B7355]">{categoria}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-[#5A4A3A] mb-2">Preço</h4>
                        <div className="space-y-1">
                          {["Até R$ 100", "R$ 100 - R$ 300", "R$ 300 - R$ 500", "Acima de R$ 500"].map((preco) => (
                            <label key={preco} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="preco"
                                checked={filters.preco === preco}
                                onChange={() => toggleFilter("preco", preco)}
                                className="border-[#D4B896]"
                              />
                              <span className="text-sm text-[#8B7355]">{preco}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Resultados */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-[#E6D7C3]">
                      <TabsTrigger value="todos">Todos ({filteredItems.length})</TabsTrigger>
                      <TabsTrigger value="book">
                        Livros ({filteredItems.filter((item) => item.type === "book").length})
                      </TabsTrigger>
                      <TabsTrigger value="painting">
                        Quadros ({filteredItems.filter((item) => item.type === "painting").length})
                      </TabsTrigger>
                      <TabsTrigger value="photo">
                        Fotos ({filteredItems.filter((item) => item.type === "photo").length})
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-[#8B9A6B] hover:bg-[#7A8A5A]" : ""}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-[#8B9A6B] hover:bg-[#7A8A5A]" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-[#5A4A3A] mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-[#8B7355]">Tente ajustar sua pesquisa ou filtros</p>
                </div>
              ) : (
                <div
                  className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}
                >
                  {filteredItems.map(renderItem)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
