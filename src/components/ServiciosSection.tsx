import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import type { Service } from "@/lib/content";

// Jerarquía por tipografía, no por color de bloque: los dos primeros
// servicios (Booking, Management) van más grandes arriba; el resto va
// debajo en una fila más chica. Un único azul, reservado para los enlaces.
export default function ServiciosSection({ services }: { services: Service[] }) {
  const featured = services.slice(0, 2);
  const rest = services.slice(2);

  return (
    <section id="servicios" className="bg-surface scroll-mt-[52px]">
      <div className="max-w-[1100px] mx-auto px-6 py-[120px] sm:py-[160px]">
        <Reveal>
          <SectionHead eyebrow="Servicios" title="Lo que hacemos por cada proyecto." />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-14">
          {featured.map((service) => (
            <Reveal key={service.name}>
              <h3 className="text-[clamp(24px,3.4vw,32px)] font-semibold tracking-[-0.01em] leading-[1.1]">
                {service.name}
              </h3>
              <p className="mt-3.5 text-[16px] leading-relaxed text-muted max-w-[38ch]">
                {service.description}
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1 mt-4 text-[15px] font-medium text-accent hover:underline"
              >
                Más información <span aria-hidden="true">›</span>
              </Link>
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-24 pt-14 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-12">
            {rest.map((service) => (
              <Reveal key={service.name}>
                <h3 className="text-[20px] font-semibold tracking-[-0.005em]">{service.name}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                  {service.description}
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-1 mt-3 text-[14px] font-medium text-accent hover:underline"
                >
                  Más información <span aria-hidden="true">›</span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
