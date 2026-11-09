"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
                  className={`text-[13px] transition-colors duration-200 ${
                    active ? "text-text" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contacto"
            className="justify-self-end text-[13px] font-semibold bg-accent text-white px-[18px] py-[9px] rounded-full hover:bg-accent-hover transition-colors"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
