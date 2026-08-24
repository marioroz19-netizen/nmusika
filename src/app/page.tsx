import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import RosterGrid from "@/components/RosterGrid";
import ServiciosSection from "@/components/ServiciosSection";
import CTASection from "@/components/CTASection";
import { getHero, getRoster, getServices } from "@/lib/notion";

export default async function Home() {
  const [hero, roster, services] = await Promise.all([
    getHero(),
    getRoster(),
    getServices(),
  ]);
  const preview = roster.slice(0, 4);

  return (
    <div className="max-w-[1180px] mx-auto px-6">
      <Hero hero={hero} />

      <Reveal className="py-16">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-[28px] font-extrabold tracking-tight">Roster</h2>
          <Link href="/roster" className="text-accent text-[13px] font-bold">
            Ver todos →
          </Link>
        </div>
        <RosterGrid artists={preview} />
      </Reveal>

      <ServiciosSection services={services} />

      <CTASection />
    </div>
  );
}
