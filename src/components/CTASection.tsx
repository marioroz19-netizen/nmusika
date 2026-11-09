import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="bg-surface">
      <Reveal className="max-w-[1100px] mx-auto px-6 py-[120px] text-center">
        <h2 className="text-[clamp(24px,3.4vw,32px)] font-semibold tracking-[-0.01em] mb-8">
          ¿Hablamos de tu próximo proyecto?
        </h2>
        <Link
          href="/contacto"
          className="inline-block bg-accent text-white font-semibold text-[15px] px-[26px] py-[13px] rounded-full hover:bg-accent-hover transition-colors"
        >
          Escríbenos →
        </Link>
      </Reveal>
    </section>
  );
}
