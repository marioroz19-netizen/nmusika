import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";
import { getServices } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Servicios — N.MUSIKA",
};

// Sin bordes ni sombras: bloques planos de color sólido. Los dos primeros
// servicios son protagonistas (grandes, arriba); el resto va debajo en
// tarjetas más chicas y uniformes. Robusto a que Notion tenga más o menos
// de 5 filas: siempre son "los dos primeros" + "el resto".
const FEATURED_STYLES = [
  { cardBg: "bg-accent", numberColor: "text-bg/15", iconTone: "inverse" as const },
  { cardBg: "bg-accent2", numberColor: "text-bg/15", iconTone: "inverse" as const },
];

const REST_STYLES = [
  { bar: "bg-accent", numberColor: "text-accent/10", iconTone: "primary" as const },
  { bar: "bg-accent2", numberColor: "text-accent2/10", iconTone: "secondary" as const },
  { bar: "bg-accent", numberColor: "text-accent/10", iconTone: "primary" as const },
];

export default async function ServiciosPage() {
  const services = await getServices();
  const featured = services.slice(0, 2);
  const rest = services.slice(2);

  return (
    <div className="max-w-[1180px] mx-auto px-6 pt-40 pb-16">
      <Reveal>
        <SectionHead
          pill="Qué hacemos"
          title="Servicios"
          description="Acompañamiento integral para tu proyecto musical, de punta a punta."
        />
      </Reveal>

      {/* Protagonistas: Booking y Management, en grande */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {featured.map((service, i) => {
          const { cardBg, numberColor, iconTone } = FEATURED_STYLES[i % FEATURED_STYLES.length];
          return (
            <Reveal key={service.name}>
              <div
                className={`relative h-full min-h-[340px] rounded-none ${cardBg} text-bg p-8 sm:p-10 overflow-hidden flex flex-col transition-transform duration-150 ease-out hover:-translate-y-1`}
              >
                <span
                  className={`pointer-events-none absolute -right-4 -top-10 font-black ${numberColor} select-none leading-none text-[190px]`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-center justify-between mb-auto">
                  <ServiceIcon name={service.name} size="lg" tone={iconTone} />
                </div>

                <div className="relative mt-8">
                  <h3 className="font-extrabold uppercase tracking-tight leading-[0.92] mb-3 text-[clamp(30px,9vw,60px)]">
                    {service.name}
                  </h3>
                  <p className="text-bg/70 leading-relaxed text-[16px] max-w-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* El resto, más chico y uniforme */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {rest.map((service, i) => {
          const { bar, numberColor, iconTone } = REST_STYLES[i % REST_STYLES.length];
          return (
            <Reveal key={service.name}>
              <div className="relative h-full min-h-[220px] rounded-none bg-surface text-text p-6 overflow-hidden flex flex-col transition-transform duration-150 ease-out hover:-translate-y-1">
                <div className={`absolute top-0 left-0 w-full h-1.5 ${bar}`} />

                <span
                  className={`pointer-events-none absolute -right-2 -top-6 font-black ${numberColor} select-none leading-none text-[90px]`}
                >
                  {String(i + 3).padStart(2, "0")}
                </span>

                <div className="relative flex items-center justify-between mb-auto">
                  <ServiceIcon name={service.name} size="md" tone={iconTone} />
                </div>

                <div className="relative mt-6">
                  <h3 className="font-extrabold uppercase tracking-tight leading-[0.95] mb-2 text-[21px]">
                    {service.name}
                  </h3>
                  <p className="text-muted leading-relaxed text-[13.5px] line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <CTASection />
    </div>
  );
}
