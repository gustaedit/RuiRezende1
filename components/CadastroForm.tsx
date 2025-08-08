"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function CadastroForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulando envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormData({ nome: "", email: "", telefone: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        {submitStatus === "success" ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#5A4A3A] mb-2">Cadastro realizado!</h2>
            <p className="text-[#8B7355] mb-6">Obrigado por se cadastrar. Em breve você receberá nossas novidades.</p>
            <Button
              variant="outline"
              onClick={() => setSubmitStatus("idle")}
              className="border-[#8B9A6B] text-[#8B9A6B] hover:bg-[#8B9A6B] hover:text-white bg-transparent"
            >
              Fazer novo cadastro
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Ocorreu um erro. Por favor, tente novamente.</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nome" className="text-[#5A4A3A] font-medium">
                Nome completo
              </Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="border-[#D4B896] focus:border-[#8B9A6B] h-12"
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5A4A3A] font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-[#D4B896] focus:border-[#8B9A6B] h-12"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-[#5A4A3A] font-medium">
                Telefone
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                className="border-[#D4B896] focus:border-[#8B9A6B] h-12"
                placeholder="Digite seu telefone"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A] h-12 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>

            <p className="text-xs text-[#8B7355] text-center">
              Ao se cadastrar, você concorda com nossa política de privacidade.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
