"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Facebook, Mail, MessageCircle } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contato" className="py-20 bg-[#E6D7C3]">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-4">Contato Rápido</h2>
          <p className="text-[#8B7355] text-lg">Entre em contato para parcerias e encomendas</p>
        </header>

       <div className=" justify-center">
  <div className="grid md:grid-cols-3 ">
    <div></div>
    <div className="space-y-6">
      <Card className="border-0 bg-white">
        <CardContent className="p-6">
          <h3 className="text-center font-semibold mb-4 text-[#5A4A3A]">Redes Sociais</h3>
          <div className="flex flex-col gap-4">
            <a
              href="https://wa.me/+557199441318"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5 text-green-600" />
              <span className="text-[#5A4A3A] font-medium">WhatsApp</span>
            </a>

            <a
              href="https://www.instagram.com/ruirezendefotos/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-pink-600" />
              <span className="text-[#5A4A3A] font-medium">Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/www.ruirezende.com.br/?locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
              <span className="text-[#5A4A3A] font-medium">Facebook</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>

      </div>
    </section>
  )
}
