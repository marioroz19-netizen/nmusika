import Link from "next/link";
import HeroVideo from "./HeroVideo";
import type { hero as HeroContent } from "@/lib/content";

export default function Hero({ hero }: { hero: typeof HeroContent }) {
  return (
    <section className="relative isolate bg-bg overflow-hidden">
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

        <p className="pen-write mt-5 sm:mt-7 font-script text-[22px] sm:text-[34px] leading-[1.3] text-text/85 px-3">
          We love music, we build projects.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-center">
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
