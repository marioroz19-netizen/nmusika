import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/lib/content";

// Listado editorial para el roster de la Home (distinto del grid con fotos
// de /roster): nombre grande + etiqueta, con una fila que reacciona al
// pasar el cursor con el mismo degradado azul diagonal de siempre. Cuando
// el artista tiene foto, esa misma forma de degradado (ángulo, tamaño,
// posición y duración) se reutiliza como máscara para desvanecer la foto
// por debajo — así ambos casos (con y sin foto) se sienten como una única
// animación, solo que una además deja asomar la imagen.
const GRADIENT = "linear-gradient(120deg, rgba(61,139,255,0.14), rgba(61,139,255,0) 60%)";
const MASK = "linear-gradient(120deg, black, transparent 60%)";

// Encuadre manual por artista para que la franja (muy ancha y baja) recorte
// la foto por donde están las caras, no por donde caiga el centro exacto.
// Las claves cubren tanto los slugs estáticos de contenido de respaldo como
// los que genera Notion a partir del título real (pueden diferir).
const FACE_POSITION: Record<string, string> = {
  "pies-en-tierra": "center 62%",
  "pies-en-tierra-oinak-lurrean": "center 62%",
  "yorrick-troman": "center 18%",
  "ignacio-garcia": "58% 42%",
  "orbit-musicians": "center 40%",
  "4sonora": "center 24%",
  "sofa-trio": "center 22%",
};

// Las fotos llegan con exposiciones muy distintas (escenario a oscuras vs.
// estudio con fondo blanco): se ajusta el brillo por artista para que todas
// pesen parecido dentro del degradado, en vez de aplicar el mismo factor a
// una foto casi negra y a otra casi blanca.
const PHOTO_BRIGHTNESS: Record<string, number> = {
  "pies-en-tierra": 1.3,
  "pies-en-tierra-oinak-lurrean": 1.3,
  "yorrick-troman": 0.65,
  "ignacio-garcia": 0.75,
  "orbit-musicians": 0.6,
  "4sonora": 0.55,
  "sofa-trio": 0.35,
};

export default function RosterManifest({ artists }: { artists: Artist[] }) {
  return (
    <div className="border-t border-border">
      {artists.map((artist) => (
        <Link
          key={artist.slug}
          href={`/roster#${artist.slug}`}
          className="group relative flex items-center justify-between gap-5 flex-wrap py-7 sm:py-9 border-b border-border overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            {artist.photo && (
              <span
                className="absolute inset-0"
                style={{ WebkitMaskImage: MASK, maskImage: MASK }}
              >
                <Image
                  src={artist.photo}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 1100px"
                  className="object-cover"
                  style={{
                    objectPosition: FACE_POSITION[artist.slug] ?? "center 30%",
                    filter: `grayscale(1) contrast(1.05) brightness(${
                      PHOTO_BRIGHTNESS[artist.slug] ?? 0.6
                    })`,
                  }}
                />
                <span
                  className="absolute inset-0"
                  style={{ background: "rgba(61,139,255,0.55)", mixBlendMode: "color" }}
                />
              </span>
            )}
            <span className="absolute inset-0" style={{ background: GRADIENT }} />
          </span>
          <span className="relative text-[clamp(24px,4.6vw,42px)] font-semibold tracking-[-0.015em] transition-colors duration-300 group-hover:text-accent-hover">
            {artist.name}
          </span>
          <span className="relative flex items-center gap-4 shrink-0">
            <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted">
              {artist.genre}
            </span>
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-full border border-border shrink-0 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:-rotate-45"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 13L13 3M13 3H6M13 3v7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
