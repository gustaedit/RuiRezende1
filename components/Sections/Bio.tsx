import Image from "next/image"

interface TimelineItem {
  year: string
  event: string
}

interface BioSectionProps {
  timeline: TimelineItem[]
}

export function BioSection({ timeline }: BioSectionProps) {
  return (
    <section id="bio" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <article className="space-y-6">
            <header>
              <h2 className="text-3xl md:text-4xl font-sertao text-[#5A4A3A] mb-6">Quem é Rui Rezende</h2>
            </header>

            <div className="font-folheto text-[#8B7355] space-y-4 leading-relaxed">
              <p>
                Nascido em Salvador, Bahia, em 1985, Rui Rezende descobriu sua paixão pela fotografia ainda jovem,
                fascinado pela beleza única e muitas vezes incompreendida da Caatinga brasileira.
              </p>
              <p>
                Ao longo de mais de duas décadas de carreira, construiu o maior acervo fotográfico da Caatinga, com mais
                de 5 milhões de imagens que documentam a rica biodiversidade e cultura do sertão nordestino.
              </p>
              <p>
                Em 2014, um acidente aéreo quase interrompeu sua jornada, mas se tornou um marco de superação e
                renovação artística. Desde então, seu trabalho ganhou ainda mais profundidade e sensibilidade.
              </p>
            </div>

            <blockquote className="border-l-4 border-[#8B9A6B] pl-6 italic text-[#5A4A3A] font-repente text-lg">
              "A Caatinga me ensinou que a beleza está nos detalhes que poucos param para observar."
            </blockquote>
          </article>

          <aside className="space-y-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagem%20do%20WhatsApp%20de%202025-07-16%20%C3%A0%28s%29%2016.59.22_cf43575e.jpg-0P5c1LWnuObIpPyCYvRJ7Pa4WkTIKE.jpeg"
                alt="Rui Rezende em seu estúdio, segurando o livro Agricultura da Bahia, demonstrando sua paixão pela fotografia documental"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#5A4A3A] mb-4">Marcos da Carreira</h3>
              {timeline.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <time className="w-16 text-sm font-semibold text-[#8B9A6B]">{item.year}</time>
                  <div className="w-2 h-2 bg-[#8B9A6B] rounded-full"></div>
                  <div className="flex-1 text-sm text-[#5A4A3A]">{item.event}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
