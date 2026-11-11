import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import type { Service } from "@/lib/content";

// Banda invertida (blanco sobre negro) para marcar fuerte contraste frente
// al Hero y al Roster. Booking y Management van grandes en una tarjeta
// partida; el resto en una fila de enlaces tipo "pill".
export default function ServiciosSection({ services }: { services: Service[] }) {
  const featured = services.slice(0, 2);
  const rest = services.slice(2);

  return (
    <section id="servicios" className="bg-bg-invert text-text-invert scroll-mt-[52px]">
      <div className="max-w-[1100px] mx-auto px-6 py-[120px] sm:py-[160px]">
        <Reveal>
          <SectionHead eyebrow="Servicios" title="Lo que hacemos por cada proyecto." invert />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 border border-border-invert rounded-[22px] overflow-hidden">
          {featured.map((service, i) => (
            <Reveal
              key={service.name}
              delay={i * 0.08}
              className={`group p-8 sm:p-12 hover:bg-black/[0.03] transition-colors duration-300 ${
                i > 0 ? "border-t sm:border-t-0 sm:border-l border-border-invert" : ""
              }`}
            >
              <h3 className="flex items-center gap-4 text-[clamp(28px,4.6vw,46px)] font-semibold tracking-[-0.02em] leading-[1.05]">
                {service.name}
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-[0.85em] h-[0.85em] shrink-0 rounded-full border border-border-invert transition-all duration-300 group-hover:border-accent2-invert group-hover:bg-accent2-invert group-hover:text-white"
                >
                  <svg
                    className="w-[0.42em] h-[0.42em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                      d="M3 13L13 3M13 3H6M13 3v7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </h3>
              <p className="mt-3.5 text-[16px] leading-relaxed text-muted-invert max-w-[38ch]">
                {service.description}
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1 mt-4 text-[15px] font-medium text-accent2-invert hover:underline"
              >
                Más información <span aria-hidden="true">›</span>
              </Link>
            </Reveal>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {rest.map((service, i) => (
              <Reveal key={service.name} delay={0.16 + i * 0.06} className="flex-1 min-w-[220px]">
                <Link
                  href="/contacto"
                  className="group flex items-center justify-between gap-3 border border-border-invert rounded-2xl px-5 py-[18px] text-[14px] font-medium hover:border-text-invert transition-colors duration-300"
                >
                  {service.name}
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full border border-border-invert shrink-0 transition-all duration-300 group-hover:border-text-invert group-hover:bg-text-invert group-hover:text-bg"
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 13L13 3M13 3H6M13 3v7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
