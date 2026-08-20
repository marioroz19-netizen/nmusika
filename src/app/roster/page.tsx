import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import RosterGrid from "@/components/RosterGrid";
import CTASection from "@/components/CTASection";
import { getRoster } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Roster — N.MUSIKA",
};

export default async function RosterPage() {
  const roster = await getRoster();

  return (
    <div className="max-w-[1180px] mx-auto px-6 pt-40 pb-16">
      <Reveal>
        <SectionHead
          pill="Roster"
          title="Artistas y grupos que gestionamos"
          description="Management y booking a medida para cada proyecto."
        />
      </Reveal>
      <Reveal>
        <RosterGrid artists={roster} />
      </Reveal>
      <CTASection />
    </div>
  );
}
