import Link from "next/link";
import HeroVideo from "./HeroVideo";
import IntroGate from "./IntroGate";
import type { hero as HeroContent } from "@/lib/content";

const LEMA = "We love music, we build projects.";

// Retardo "aleatorio" pero fijo para cada letra (igual en servidor y
// navegador): las letras aparecen desordenadas a lo largo de ~8 segundos.
function charDelay(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return 0.6 + (x - Math.floor(x)) * 6.4;
}

export default function Hero({ hero }: { hero: typeof HeroContent }) {
  return (
    <section className="hero-section relative isolate bg-bg overflow-hidden">
      <IntroGate />
      {/* Vídeo de fondo muy opaco, solo como textura ambiental detrás del
          texto — mismo recurso que en versiones anteriores del Hero, pero
          adaptado a la banda full-bleed de la dirección Apple/vintage. */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ left: "50%", width: "100vw", transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <HeroVideo />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 min-h-[82vh] flex flex-col items-center justify-center text-center py-20">
        <h1
          className="fade-up font-display font-normal tracking-[-0.02em] leading-[0.95] text-[14vw] sm:text-[clamp(38px,10.5vw,128px)]"
          style={{ "--d": "0.1s" } as React.CSSProperties}
        >
          N·MUSIKA
        </h1>

        <p
          className="mt-5 sm:mt-6 text-[15px] sm:text-[19px] leading-relaxed text-muted max-w-[480px]"
          aria-label={LEMA}
        >
          {LEMA.split(" ").map((word, w) => (
            <span key={w} className="inline-block whitespace-nowrap" aria-hidden="true">
              {[...word].map((ch, c) => (
                <span
                  key={c}
                  className="lema-char"
                  style={{ "--cd": `${charDelay(w * 31 + c)}s` } as React.CSSProperties}
                >
                  {ch}
                </span>
              ))}
              {w < LEMA.split(" ").length - 1 ? "\u00a0" : null}
            </span>
          ))}
        </p>
      </div>

      <div className="intro-hide absolute inset-x-0 bottom-10 flex justify-center">
        <Link
          href="/nosotros"
          className="fade-up inline-flex flex-col items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-muted hover:text-text transition-colors duration-300"
          style={{ "--d": "0.34s" } as React.CSSProperties}
        >
          <span>{hero.cue}</span>
          <svg
            className="cue-arrow"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
