import Image from "next/image";
import type { hero as HeroContent } from "@/lib/content";

export default function Hero({ hero }: { hero: typeof HeroContent }) {
  return (
    <section className="relative min-h-screen text-center overflow-hidden w-full">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-[0.14]"
          style={{ transform: "scale(1.08)" }}
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 max-w-[1180px] mx-auto px-6">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(620px,78vw)] opacity-0"
          style={{
            animation: "heroLogoIn 3.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            filter: "drop-shadow(0 0 60px rgba(61,139,255,0.35))",
          }}
        >
          <Image
            src="/brand/logo-white.png"
            alt="N.MUSIKA"
            width={620}
            height={207}
            priority
            className="w-full h-auto"
          />
        </div>

        <div
          className="absolute left-1/2 w-full max-w-[460px] px-6 opacity-0"
          style={{
            top: "calc(50% + 74px)",
            transform: "translate(-50%, 10px)",
            animation: "heroTextIn 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            animationDelay: "1.2s",
          }}
        >
          <h1 className="text-[clamp(14px,1.4vw,17px)] font-normal tracking-[0.08em]">
            {hero.headline}
          </h1>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-muted"
          style={{ top: "calc(50% + 300px)" }}
        >
          <span
            className="opacity-0"
            style={{
              transform: "translate(0,-20px)",
              animation: "cueIn 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              animationDelay: "2.4s",
            }}
          >
            {hero.cue}
          </span>
          <span
            className="text-[15px] opacity-0"
            style={{
              animation:
                "cueIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards 3.1s, arrowBounce 2.2s ease-in-out infinite 4.6s",
            }}
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
