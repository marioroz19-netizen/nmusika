import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import RosterManifest from "@/components/RosterManifest";
import RosterTicker from "@/components/RosterTicker";
import SectionHead from "@/components/SectionHead";
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

      <RosterTicker artists={roster} />

      <ServiciosSection services={services} />

      <section className="bg-bg">
        <div className="max-w-[1100px] mx-auto px-6 py-[120px] sm:py-[160px]">
          <Reveal>
            <SectionHead eyebrow="Roster" title="Los artistas que representamos." />
          </Reveal>
          <Reveal>
            <RosterManifest artists={roster} />
          </Reveal>
          <Reveal>
            <Link
              href="/roster"
              className="inline-flex items-center gap-1.5 mt-10 text-[15px] font-medium text-accent2 hover:underline"
            >
              Ver todo el roster <span aria-hidden="true">›</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
