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

        <Reveal className="py-24">
          <div className="flex justify-between items-baseline mb-5">
            <h2 className="text-[19px] font-extrabold tracking-tight">Roster</h2>
            <Link href="/roster" className="text-accent text-[13px] font-bold">
              Ver todos →
            </Link>
          </div>
          <RosterMarquee artists={roster} />
        </Reveal>

        <CTASection />
      </div>
    </>
  );
}
