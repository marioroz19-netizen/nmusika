import Link from "next/link";
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
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-[0.16]"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 min-h-[82vh] flex flex-col items-center justify-center text-center py-20">
        <h1
          className="fade-up font-display font-normal tracking-[-0.02em] leading-[0.95] text-[clamp(38px,10.5vw,128px)]"
          style={{ "--d": "0.1s" } as React.CSSProperties}
        >
          N·MUSIKA
        </h1>

        <p
          className="fade-up mt-6 text-[19px] leading-relaxed text-muted max-w-[480px]"
          style={{ "--d": "0.22s" } as React.CSSProperties}
        >
          Management y booking musical en Pamplona / Iruña.
        </p>

        <Link
          href="/nosotros"
          className="fade-up mt-12 inline-flex flex-col items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-muted hover:text-text transition-colors duration-300"
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
