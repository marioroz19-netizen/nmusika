import Image from "next/image";
import { Artist } from "@/lib/content";

// Degradados planos y muy sutiles para las tarjetas sin foto todavía —
// nada de glow radial de color, solo variación tonal casi-negra.
const FALLBACK_GRADIENTS: [string, string][] = [
  ["#1c2230", "#0a0d14"],
  ["#201c22", "#0c0a0e"],
  ["#1c201f", "#0a0c0b"],
  ["#1e1c22", "#0b0a0e"],
  ["#1c1e22", "#0a0b0e"],
];

export default function RosterGrid({ artists }: { artists: Artist[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {artists.map((artist, i) => {
        const [c1, c2] = FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length];
        return (
          <div
            key={artist.slug}
            className="relative aspect-[1/1.08] rounded-[24px] overflow-hidden flex items-end p-6 transition-transform duration-[400ms] ease-out hover:scale-[1.015]"
            style={{ background: `linear-gradient(165deg, ${c1}, ${c2})` }}
          >
            {artist.photo && (
              <Image
                src={artist.photo}
                alt={artist.name}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)",
              }}
            />
            <div className="relative z-10">
              <div className="font-semibold text-[18px] tracking-[-0.005em]">{artist.name}</div>
              <div className="text-muted text-[11px] uppercase tracking-[0.08em] mt-1">
                {artist.genre}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
