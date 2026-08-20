import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <Reveal className="pt-24 pb-8 text-center">
      <h2 className="text-[clamp(30px,5vw,54px)] font-extrabold tracking-tight max-w-xl mx-auto mb-8">
        ¿Tienes un proyecto musical
        <br />
        que necesita <span className="text-accent">dirección</span>?
      </h2>
      <Link
        href="/contacto"
        className="inline-block bg-accent text-bg font-bold text-[14px] px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        Escríbenos →
      </Link>
    </Reveal>
  );
}
