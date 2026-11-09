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
    <>
      <div className="max-w-[1100px] mx-auto px-6 pt-24 sm:pt-32 pb-24 sm:pb-32">
        <Reveal>
          <SectionHead
            eyebrow="Quiénes somos"
            title="El equipo detrás de N.MUSIKA"
            description="Musika Profesionalen Elkartea — management y booking musical desde Pamplona/Iruña."
          />
        </Reveal>

        <Reveal>
          <TeamGrid members={team} />
        </Reveal>
      </div>
      <CTASection />
    </>
  );
}
