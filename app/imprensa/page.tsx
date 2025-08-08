import type { Metadata } from "next"
import { ImprensaContent } from "@/components/ImprensaContent"

export const metadata: Metadata = {
  title: "Imprensa | Rui Rezende Photography",
  description: "Vídeos, reportagens e entrevistas sobre o trabalho de Rui Rezende, fotógrafo da Caatinga.",
}

export default function ImprensaPage() {
  return (
    <div className="min-h-screen bg-[#F5F2ED] pt-20">
      <ImprensaContent />
    </div>
  )
}
