import { Artist } from "@/lib/content";

// Listado editorial para el roster de la Home (distinto del grid con fotos
// de /roster): nombre grande + etiqueta, con una fila que reacciona al
// pasar el cursor.
export default function RosterManifest({ artists }: { artists: Artist[] }) {
  return (
    <div className="border-t border-border">
      {artists.map((artist) => (
        <div
          key={artist.slug}
          className="group relative flex items-baseline justify-between gap-5 flex-wrap py-7 sm:py-9 border-b border-border overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(120deg, rgba(61,139,255,0.14), rgba(61,139,255,0) 60%)",
            }}
          />
          <span className="text-[clamp(24px,4.6vw,42px)] font-semibold tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent-hover">
            {artist.name}
          </span>
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted">
            {artist.genre}
          </span>
        </div>
      ))}
    </div>
  );
}
