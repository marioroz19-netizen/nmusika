import type { hero as HeroContent } from "@/lib/content";

export default function Hero({ hero }: { hero: typeof HeroContent }) {
  return (
    <section className="bg-bg">
      <div className="max-w-[1100px] mx-auto px-6 pt-[120px] pb-[100px] sm:pt-[160px] sm:pb-[120px] text-center">
        <p
          className="fade-up text-[12px] font-semibold tracking-[0.14em] uppercase text-muted"
          style={{ "--d": "0s" } as React.CSSProperties}
        >
          N·MUSIKA
        </p>

        <h1
          className="fade-up mt-5 font-semibold tracking-[-0.02em] leading-[1.02] text-[clamp(42px,8vw,96px)]"
          style={{ "--d": "0.1s" } as React.CSSProperties}
        >
          {hero.headline}
        </h1>

        <p
          className="fade-up mt-6 text-[19px] leading-relaxed text-muted max-w-[520px] mx-auto"
          style={{ "--d": "0.2s" } as React.CSSProperties}
        >
          Management y booking musical en Pamplona / Iruña.
        </p>

        <div
          className="fade-up mt-[72px] inline-flex flex-col items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase text-muted"
          style={{ "--d": "0.32s" } as React.CSSProperties}
        >
          <span>{hero.cue}</span>
          <svg
            className="cue-arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
