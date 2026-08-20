"use client";

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
          <Link href="/" className="font-extrabold text-[15px] tracking-wide text-muted">
            N·MUSIKA
          </Link>

          <div className="hidden sm:flex gap-2 bg-white/[0.04] border border-border p-1.5 rounded-full">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] px-4 py-2 rounded-full transition-colors ${
                    active
                      ? "bg-accent text-bg font-bold"
                      : "text-muted hover:text-text"
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
