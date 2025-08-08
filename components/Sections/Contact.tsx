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

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="border-0 bg-white">
            <CardContent className="p-8">
              <form className="space-y-4">
                <Input placeholder="Seu nome" className="border-[#D4B896] focus:border-[#8B9A6B]" />
                <Input type="email" placeholder="Seu e-mail" className="border-[#D4B896] focus:border-[#8B9A6B]" />
                <Textarea placeholder="Sua mensagem" rows={4} className="border-[#D4B896] focus:border-[#8B9A6B]" />
                <Button className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A]">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-[#5A4A3A]">Redes Sociais</h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://wa.me/5571999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <span className="text-[#5A4A3A] font-medium">WhatsApp</span>
                  </a>
                  <a
                    href="https://instagram.com/ruirezende"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="text-[#5A4A3A] font-medium">Instagram</span>
                  </a>
                  <a
                    href="https://facebook.com/ruirezende"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
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
    </section>
  )
}
