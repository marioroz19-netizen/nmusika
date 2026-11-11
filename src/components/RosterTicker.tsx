import { Artist } from "@/lib/content";

// Banner del roster bajo el Hero: nombres en bucle continuo, en cursiva
// display (Instrument Serif Italic) a toda la altura de la franja. Los
// nombres alternan relleno crema y contorno cobre claro; el separador es
// el punto "·" de la marca.
export default function RosterTicker({ artists }: { artists: Artist[] }) {
  if (artists.length === 0) return null;
  const loop = [...artists, ...artists];

  return (
    <section
      aria-label="Roster N.MUSIKA"
      className="roster-banner relative bg-bg border-y border-accent/60 overflow-hidden"
    >
      <div className="ticker-mask overflow-hidden">
        <div className="ticker-track flex items-center w-max">
          {loop.map((artist, i) => (
            <span key={`${artist.slug}-${i}`} className="flex items-center shrink-0">
              <span
                className={`roster-name font-display italic whitespace-nowrap leading-none px-[0.28em] ${
                  i % 2 === 0 ? "text-text" : "roster-name--outline"
                }`}
              >
                {artist.name}
              </span>
              <span className="roster-dot" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
