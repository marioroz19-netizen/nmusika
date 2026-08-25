import Link from "next/link";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <Reveal className="pt-24 pb-12 text-center">
      <Link
        href="/contacto"
        className="inline-block bg-accent text-bg font-bold text-[14px] px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        Escríbenos →
      </Link>
    </Reveal>
  );
}
