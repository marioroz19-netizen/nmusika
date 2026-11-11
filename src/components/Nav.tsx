"use client";

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
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center h-[64px]">
          <Link
            href="/"
            aria-label="N.MUSIKA — Inicio"
            className="justify-self-start shrink-0 font-display text-[22px] leading-none font-normal tracking-[-0.02em] text-text opacity-90 hover:opacity-100 transition-opacity"
          >
            N<span className="text-accent2">·</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1 justify-self-center rounded-full border border-border p-1">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-[7px] rounded-full text-[13px] font-medium tracking-[-0.005em] transition-colors duration-300 ${
                    active
                      ? "bg-text text-bg"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden sm:block justify-self-end">
            <Magnetic strength={0.25}>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 text-[13px] font-semibold bg-accent text-white pl-[18px] pr-[7px] py-[7px] rounded-full hover:bg-accent-hover active:scale-95 transition-all duration-200"
              >
                Contacto
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-white/20"
                >
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
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
          </div>
        </nav>
      </div>
    </header>
  );
}
