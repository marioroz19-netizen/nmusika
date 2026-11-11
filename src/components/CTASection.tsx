import Link from "next/link";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function CTASection() {
  return (
    <section className="bg-bg-invert text-text-invert">
      <Reveal className="max-w-[1100px] mx-auto px-6 py-[130px] sm:py-[160px] text-center">
        <h2 className="text-[clamp(28px,4.6vw,48px)] font-semibold tracking-[-0.02em] mb-8 max-w-[620px] mx-auto">
          ¿Hablamos de tu próximo proyecto?
        </h2>
        <Magnetic strength={0.22}>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-[15px] pl-[28px] pr-[9px] py-[9px] rounded-full hover:bg-accent-hover active:scale-95 transition-all duration-200"
          >
            Escríbenos
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/20"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
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
      </Reveal>
    </section>
  );
}
