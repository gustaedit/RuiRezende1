"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/Sections/Hero"
import { BioSection } from "@/components/Sections/Bio"
import { LibrarySection } from "@/components/Sections/Library"
import { GallerySection } from "@/components/Sections/Gallery"
import { PaintingsSection } from "@/components/Sections/Paintings"
import { NewsSection } from "@/components/Sections/NewsSection"
import { ContactSection } from "@/components/Sections/Contact"
import { WhatsAppFloat } from "@/components/WhatsAppFloat"
import { ScrollToTop } from "@/components/ScrollToTop"
import { books, paintings, photos, timeline, news } from "@/data"
import { CustomFrameCreator } from "../components/Sections/custom-frame-creator"


export default function ClientHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "bio", "biblioteca", "quadros", "acervo", "noticias", "contato"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isCarouselPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % news.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isCarouselPlaying, news.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <Header />

      <main>
        <HeroSection />
        <BioSection timeline={timeline} />
        <LibrarySection books={books} />
        {/*  <PaintingsSection paintings={paintings} />*/}
        {/*<GallerySection photos={photos} /> */}
        {/* <CustomFrameCreator /> */}
        <NewsSection news={news} />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </div>
  )
}
