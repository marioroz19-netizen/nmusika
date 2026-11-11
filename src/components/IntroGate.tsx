"use client";

import { useEffect, useState } from "react";

// Intro de la portada: al entrar por primera vez solo se ve N·MUSIKA y el
// lema sobre negro (el vídeo entra después). El resto de la web (menú,
// "Conócenos", banner y secciones) aparece a los 5 s, o antes si se mueve
// el ratón / se toca la pantalla, pero nunca antes de 3 s. Una vez vista,
// no se repite en la misma sesión. El CSS que oculta el resto vive en
// globals.css y depende de este marcador (#intro-gate sin data-done).
export const INTRO_KEY = "nm-intro-visto";
const MIN_MS = 3000;
const AUTO_MS = 5000;

export default function IntroGate() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setDone(true);
      return;
    }

    const start = performance.now();
    let finished = false;
    let pending: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      cleanup();
    };
    const onInteract = () => {
      const wait = MIN_MS - (performance.now() - start);
      if (wait <= 0) finish();
      else if (!pending) pending = setTimeout(finish, wait);
    };
    const auto = setTimeout(finish, AUTO_MS);
    const events = ["mousemove", "touchstart", "wheel", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true }));
    function cleanup() {
      clearTimeout(auto);
      if (pending) clearTimeout(pending);
      events.forEach((e) => window.removeEventListener(e, onInteract));
    }
    return cleanup;
  }, []);

  return <span id="intro-gate" hidden data-done={done ? "" : undefined} />;
}
