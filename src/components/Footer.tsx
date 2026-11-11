import Image from "next/image";
import Link from "next/link";
import { getContact } from "@/lib/notion";

// Footer con más estructura (logo + columnas de enlaces) inspirado en el
// pie de Berliner Philharmoniker, pero manteniendo la paleta y tipografía
// propias de N.MUSIKA.
export default async function Footer() {
  const contact = await getContact();

  return (
    <footer className="relative z-10 border-t border-border">
      <div className="max-w-[1100px] mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr_1fr] gap-12 sm:gap-8">
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="N.MUSIKA"
              width={1616}
              height={240}
              className="h-[20px] w-auto opacity-90"
            />
            <p className="mt-5 text-[14px] leading-relaxed text-muted max-w-[280px]">
              Management y booking musical en Pamplona / Iruña.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted mb-4">
              Navegación
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-[14px] text-text/80 hover:text-text transition-colors">
                Inicio
              </Link>
              <Link
                href="/roster"
                className="text-[14px] text-text/80 hover:text-text transition-colors"
              >
                Roster
              </Link>
              <Link
                href="/nosotros"
                className="text-[14px] text-text/80 hover:text-text transition-colors"
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                className="text-[14px] text-text/80 hover:text-text transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>

          <div>
            <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted mb-4">
              Contacto
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="text-[14px] text-text/80 hover:text-text transition-colors break-all"
              >
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="text-[14px] text-text/80 hover:text-text transition-colors"
              >
                {contact.phone}
              </a>
              <span className="text-[14px] text-text/80">{contact.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-muted">
          <span>N.MUSIKA © 2026</span>
          <span>Pamplona / Iruña</span>
        </div>
      </div>
    </footer>
  );
}
