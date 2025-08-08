"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!showScrollTop) return null

  return (
    <Button
      className="fixed bottom-24 right-6 z-30 bg-[#8B9A6B] hover:bg-[#7A8A5A] text-white rounded-full w-12 h-12 shadow-lg"
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  )
}
