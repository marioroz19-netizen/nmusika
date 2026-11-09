import type { hero as HeroContent } from "@/lib/content";

export default function Hero({ hero }: { hero: typeof HeroContent }) {
  return (
    <section className="bg-bg">
      <div className="max-w-[1100px] mx-auto px-6 min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
        <h1
          className="fade-up font-semibold tracking-[-0.03em] leading-[0.95] text-[clamp(44px,13vw,140px)]"
          style={{ "--d": "0s" } as React.CSSProperties}
        >
          N·MUSIKA
        </h1>

        <p
          className="fade-up mt-6 text-[19px] leading-relaxed text-muted max-w-[480px]"
          style={{ "--d": "0.15s" } as React.CSSProperties}
        >
          Management y booking musical en Pamplona / Iruña.
        </p>

        <div
          className="fade-up mt-[64px] inline-flex flex-col items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase text-muted"
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
