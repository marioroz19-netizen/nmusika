import { Artist } from "@/lib/content";

// Franja fina bajo el Hero con los nombres del roster en bucle continuo —
// el toque cinético/alternativo que pide Mario, sin inventar fechas de
// gira (eso vendrá cuando haya datos reales en Notion).
export default function RosterTicker({ artists }: { artists: Artist[] }) {
  if (artists.length === 0) return null;
  const loop = [...artists, ...artists];

  return (
    <div className="bg-bg border-y border-border overflow-hidden">
      <div className="flex items-center gap-7 py-3.5">
        <span className="shrink-0 pl-6 text-[11px] font-semibold tracking-[0.14em] uppercase text-accent">
          Roster
        </span>
        <div className="ticker-mask flex-1 min-w-0 overflow-hidden">
          <div className="ticker-track flex items-center gap-10 w-max">
            {loop.map((artist, i) => (
              <span key={`${artist.slug}-${i}`} className="flex items-center gap-10 shrink-0">
                <span className="text-[13px] tracking-[0.01em] text-text font-medium whitespace-nowrap">
                  {artist.name}
                </span>
                <span className="text-muted" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
