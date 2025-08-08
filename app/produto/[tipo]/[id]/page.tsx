import { notFound } from "next/navigation"
import { ProductPage } from "@/components/ProductPage"
import { books, paintings } from "@/data"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    tipo: string
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { tipo, id } = params

  let product
  if (tipo === "livro") {
    product = books.find((book) => book.id.toString() === id)
  } else if (tipo === "quadro") {
    product = paintings.find((painting) => painting.id === id)
  }

  if (!product) {
    return {
      title: "Produto não encontrado - Rui Rezende",
    }
  }

  const title = tipo === "livro" ? product.name : product.title
  const description = tipo === "livro" ? product.description : `Quadro ${product.title} - ${product.theme}`

  return {
    title: `${title} - Rui Rezende Photography`,
    description,
    openGraph: {
      title,
      description,
      images: [product.image],
    },
  }
}

export default function ProductPageRoute({ params }: ProductPageProps) {
  const { tipo, id } = params

  if (tipo !== "livro" && tipo !== "quadro") {
    notFound()
  }

  let product
  let relatedProducts

  if (tipo === "livro") {
    product = books.find((book) => book.id.toString() === id)
    relatedProducts = books.filter((book) => book.id.toString() !== id).slice(0, 4)
  } else {
    product = paintings.find((painting) => painting.id === id)
    relatedProducts = paintings.filter((painting) => painting.id !== id).slice(0, 4)
  }

  if (!product) {
    notFound()
  }

  return <ProductPage product={product} type={tipo} relatedProducts={relatedProducts} />
}
