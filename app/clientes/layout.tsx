import type React from "react"

export default function ClientesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-[#F5F2ED]">{children}</div>
}
