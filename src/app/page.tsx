import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import RosterMarquee from "@/components/RosterMarquee";
import ServiciosSection from "@/components/ServiciosSection";
import CTASection from "@/components/CTASection";
import { getHero, getRoster, getServices } from "@/lib/notion";

export default async function Home() {
  const [hero, roster, services] = await Promise.all([
    getHero(),
    getRoster(),
    getServices(),
  ]);

  return (
    <>
      <Hero hero={hero} />

      <div className="max-w-[1180px] mx-auto px-6">
        <ServiciosSection services={services} />
      </div>

      <Reveal className="py-24">
        <div className="max-w-[1180px] mx-auto px-6 flex justify-between items-baseline mb-7">
          <h2 className="text-[26px] font-extrabold tracking-tight">Roster</h2>
          <Link href="/roster" className="text-accent text-[13px] font-bold">
            Ver todos →
          </Link>
        </div>
        <RosterMarquee artists={roster} />
      </Reveal>

      <div className="max-w-[1180px] mx-auto px-6">
        <CTASection />
      </div>
    </>
  );
}
