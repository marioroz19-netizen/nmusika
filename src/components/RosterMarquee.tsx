import Image from "next/image";
import type { Artist } from "@/lib/content";

// Fila horizontal de artistas, en miniatura, con scroll automático infinito
// (pensada para la Home: todos los artistas caben en una sola línea que se
// desplaza sola, en vez del grid grande de la página Roster).
export default function RosterMarquee({ artists }: { artists: Artist[] }) {
  if (artists.length === 0) return null;

  // Se duplica la lista para poder animar de 0% a -50% sin salto visible.
  const loop = [...artists, ...artists];
  const duration = Math.max(artists.length * 8, 34);

  return (
    <div className="roster-marquee relative w-full overflow-hidden">
      <div
        className="roster-marquee-track flex w-max gap-4"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((artist, i) => (
          <div
            key={`${artist.slug}-${i}`}
            className="relative shrink-0 w-[135px] sm:w-[165px] aspect-[1/1.05] rounded-[14px] border border-border overflow-hidden flex items-end p-3"
            style={{
              background: "linear-gradient(160deg, #141c2c, #0a0f18)",
            }}
          >
            {artist.photo && (
              <Image
                src={artist.photo}
                alt={artist.name}
                fill
                unoptimized
                sizes="165px"
                className="object-cover"
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,7,12,0), rgba(5,7,12,0.55) 65%, rgba(5,7,12,0.72))",
              }}
            />
            {!artist.photo && (
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(61,139,255,0.35), transparent 60%)",
                }}
              />
            )}
            <div className="relative z-10">
              <div className="font-extrabold text-[12px] leading-tight tracking-tight">
                {artist.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10"
        style={{ background: "linear-gradient(90deg, var(--color-bg), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10"
        style={{ background: "linear-gradient(270deg, var(--color-bg), transparent)" }}
      />
    </div>
  );
}
