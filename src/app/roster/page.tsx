import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import RosterGrid, { FALLBACK_GRADIENTS } from "@/components/RosterGrid";
import CTASection from "@/components/CTASection";
import { getRoster } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Roster — N.MUSIKA",
};

export default async function RosterPage() {
  const roster = await getRoster();
  const strip = roster.slice(0, 6);

  return (
    <>
      <div className="max-w-[1100px] mx-auto px-6 pt-24 sm:pt-32 pb-24 sm:pb-32">
        <Reveal>
          <SectionHead
            eyebrow="Roster"
            title="Artistas y grupos que gestionamos"
            description="Management y booking a medida para cada proyecto."
          />
        </Reveal>
        <Reveal>
          <RosterGrid artists={roster} />
        </Reveal>
      </div>

      {strip.length > 0 && (
        <section className="bg-bg">
          <div className="grid grid-cols-2 sm:grid-cols-3">
            {strip.map((artist, i) => {
              const [c1, c2] = FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length];
              return (
                <a
                  key={artist.slug}
                  href={`#${artist.slug}`}
                  className="group relative aspect-[3/4] overflow-hidden block"
                  style={{ background: `linear-gradient(165deg, ${c1}, ${c2})` }}
                >
                  {artist.photo && (
                    <Image
                      src={artist.photo}
                      alt={artist.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  )}
                  <div
                    className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-5">
                    <div className="font-semibold text-[15px] tracking-[-0.005em]">
                      {artist.name}
                    </div>
                    <div className="text-muted text-[10px] uppercase tracking-[0.08em] mt-1">
                      {artist.genre}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
