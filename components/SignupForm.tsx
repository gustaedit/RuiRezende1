"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function SignupForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    interests: {
      exhibitions: false,
      books: false,
      workshops: false,
      newsletter: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (interest: string, checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: checked,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulando envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        {submitStatus === "success" ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#5A4A3A] mb-2">Cadastro realizado!</h2>
            <p className="text-[#8B7355]">
              Obrigado por se cadastrar. Em breve você receberá nossas novidades por email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5" />
                <span>Ocorreu um erro. Por favor, tente novamente.</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="border-[#D4B896] focus:border-[#8B9A6B]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="border-[#D4B896] focus:border-[#8B9A6B]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleChange}
                className="border-[#D4B896] focus:border-[#8B9A6B]"
              />
            </div>

            <div className="space-y-3 pt-2">
              <Label>Interesses</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="exhibitions"
                    checked={formState.interests.exhibitions}
                    onCheckedChange={(checked) => handleCheckboxChange("exhibitions", checked === true)}
                  />
                  <Label htmlFor="exhibitions" className="text-sm font-normal cursor-pointer">
                    Exposições e eventos
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="books"
                    checked={formState.interests.books}
                    onCheckedChange={(checked) => handleCheckboxChange("books", checked === true)}
                  />
                  <Label htmlFor="books" className="text-sm font-normal cursor-pointer">
                    Lançamentos de livros
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="workshops"
                    checked={formState.interests.workshops}
                    onCheckedChange={(checked) => handleCheckboxChange("workshops", checked === true)}
                  />
                  <Label htmlFor="workshops" className="text-sm font-normal cursor-pointer">
                    Workshops e cursos
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="newsletter"
                    checked={formState.interests.newsletter}
                    onCheckedChange={(checked) => handleCheckboxChange("newsletter", checked === true)}
                  />
                  <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
                    Newsletter mensal
                  </Label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#8B9A6B] hover:bg-[#7A8A5A] mt-6" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Cadastrar"}
            </Button>

            <p className="text-xs text-[#8B7355] text-center mt-4">
              Ao se cadastrar, você concorda com nossa política de privacidade e termos de uso.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
