import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTASection from "@/components/CTASection";
import { getServices } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Servicios — N.MUSIKA",
};

export default async function ServiciosPage() {
  const services = await getServices();

  return (
    <div className="max-w-[1180px] mx-auto px-6 pt-40 pb-16">
      <Reveal>
        <SectionHead pill="Qué hacemos" title="Servicios" />
      </Reveal>

      <Reveal className="border-t border-border">
        {services.map((service, i) => (
          <div
            key={service.name}
            className="grid grid-cols-[70px_1fr] sm:grid-cols-[70px_1fr_1.3fr] gap-4 sm:gap-7 items-start py-8 border-b border-border"
          >
            <div className="font-extrabold text-[14px] text-accent pt-1">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-[22px] font-extrabold tracking-tight">{service.name}</h3>
            <p className="text-muted text-[14.5px] leading-relaxed col-span-2 sm:col-span-1">
              {service.description}
            </p>
          </div>
        ))}
      </Reveal>

      <CTASection />
    </div>
  );
}
