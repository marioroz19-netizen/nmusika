"use client";

import { useEffect, useState } from "react";

// Botón flotante circular "volver arriba" — aparece tras bajar un tramo
// de la página. Estilo neutro (surface/border), no accent, para que quede
// como control de utilidad y no compita con los CTA azules.
export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 560);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-30 inline-flex items-center justify-center w-[44px] h-[44px] rounded-full border border-border bg-surface/90 backdrop-blur-xl text-text shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-text ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
