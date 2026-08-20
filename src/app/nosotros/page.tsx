import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import TeamGrid from "@/components/TeamGrid";
import CTASection from "@/components/CTASection";
import { getTeam } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Nosotros — N.MUSIKA",
};

export default async function NosotrosPage() {
  const team = await getTeam();

  return (
    <div className="max-w-[1180px] mx-auto px-6 pt-40 pb-16 text-center">
      <Reveal>
        <SectionHead
          pill="Quiénes somos"
          title="El equipo detrás de N.MUSIKA"
          description="Musika Profesionalen Elkartea — management y booking musical desde Pamplona/Iruña."
        />
      </Reveal>

      <Reveal className="text-left">
        <TeamGrid members={team} />
      </Reveal>

      <CTASection />
    </div>
  );
}
