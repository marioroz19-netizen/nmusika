import Image from "next/image";
import { Artist } from "@/lib/content";

// Listado editorial para el roster de la Home (distinto del grid con fotos
// de /roster): nombre grande + etiqueta, con una fila que reacciona al
// pasar el cursor. Si el artista tiene foto, se asoma como fondo de la
// franja bajo un filtro azul (duotono, a juego con el acento de la marca);
// si no tiene foto, se mantiene el degradado azul sutil de antes.
export default function RosterManifest({ artists }: { artists: Artist[] }) {
  return (
    <div className="border-t border-border">
      {artists.map((artist) => (
        <div
          key={artist.slug}
          className="group relative flex items-baseline justify-between gap-5 flex-wrap py-7 sm:py-9 border-b border-border overflow-hidden"
        >
          {artist.photo ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-[opacity,transform] duration-[600ms] ease-out"
            >
              <Image
                src={artist.photo}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, 1100px"
                className="object-cover"
                style={{ filter: "grayscale(1) contrast(1.05) brightness(0.8)" }}
              />
              {/* Filtro azul (duotono) sobre la foto */}
              <span
                className="absolute inset-0"
                style={{ background: "rgba(61,139,255,0.5)", mixBlendMode: "color" }}
              />
              {/* Oscurece los bordes para que el nombre siga siendo legible */}
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.55) 100%)",
                }}
              />
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(120deg, rgba(61,139,255,0.14), rgba(61,139,255,0) 60%)",
              }}
            />
          )}
          <span className="relative text-[clamp(24px,4.6vw,42px)] font-semibold tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent-hover">
            {artist.name}
          </span>
          <span className="relative text-[11px] font-medium tracking-[0.1em] uppercase text-muted">
            {artist.genre}
          </span>
        </div>
      ))}
    </div>
  );
}
