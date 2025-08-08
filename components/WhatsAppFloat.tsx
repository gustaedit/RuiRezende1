import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5571999999999?text=Olá! Gostaria de saber mais sobre o trabalho do Rui Rezende."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Entrar em contato via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
