"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "./Magnetic";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/roster", label: "Roster" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-bg/70 backdrop-blur-xl backdrop-saturate-[1.8] border-b border-border">
      <div className="max-w-[1100px] mx-auto px-6">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center h-[52px]">
          <Link href="/" className="justify-self-start shrink-0">
            <Image
              src="/brand/logo-white.png"
              alt="N.MUSIKA"
              width={1616}
              height={240}
              priority
              className="h-[16px] w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>

          <div className="hidden sm:flex gap-8 justify-self-center">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-0.5 text-[13px] transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-px after:bg-text after:transition-[right] after:duration-300 after:ease-out ${
                    active
                      ? "text-text after:right-0"
                      : "text-muted hover:text-text after:right-full hover:after:right-0"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Magnetic className="justify-self-end" strength={0.25}>
            <Link
              href="/contacto"
              className="inline-block text-[13px] font-semibold bg-accent text-white px-[18px] py-[9px] rounded-full hover:bg-accent-hover active:scale-95 transition-all duration-200"
            >
              Contacto
            </Link>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
}
