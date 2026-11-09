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
            className="inline-block bg-accent text-white font-semibold text-[15px] px-[28px] py-[14px] rounded-full hover:bg-accent-hover active:scale-95 transition-all duration-200"
          >
            Escríbenos →
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
