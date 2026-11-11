import Link from "next/link";
import type { hero as HeroContent } from "@/lib/content";
import Magnetic from "./Magnetic";

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
          className="fade-up font-semibold tracking-[-0.03em] leading-[0.95] text-[clamp(48px,13.5vw,152px)]"
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

        <div
          className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ "--d": "0.34s" } as React.CSSProperties}
        >
          <Magnetic strength={0.2}>
            <Link
              href="/roster"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-[14px] pl-[20px] pr-[8px] py-[8px] rounded-full hover:bg-accent-hover active:scale-95 transition-all duration-200"
            >
              Ver roster
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-white/20"
              >
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 13L13 3M13 3H6M13 3v7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
