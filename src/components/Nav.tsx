"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/roster", label: "Roster" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <nav className="flex items-center justify-between py-7">
          <Link href="/" className="shrink-0">
            <Image
              src="/brand/logo-white.png"
              alt="N.MUSIKA"
              width={1616}
              height={240}
              priority
              className="h-[18px] w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>

          <div className="hidden sm:flex gap-7">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] tracking-wide transition-all duration-200 hover:text-text hover:scale-110 ${
                    active ? "text-text font-bold" : "text-muted font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contacto"
            className="text-[13px] font-bold bg-text text-bg px-5 py-2.5 rounded-full"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
