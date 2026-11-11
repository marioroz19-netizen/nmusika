"use client";

import { useEffect, useRef, useState } from "react";
import { INTRO_KEY } from "./IntroGate";

// Vídeo de fondo del Hero. Mientras no está listo, la pantalla se queda en
// negro (el vídeo es invisible, así que nunca se ve el botón de play que
// algunos móviles muestran si bloquean la reproducción automática). En la
// intro espera ~2,5 s sobre negro y después entra con un fundido.
const INTRO_DELAY_MS = 2500;

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [delayOver, setDelayOver] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const t = setTimeout(() => setDelayOver(true), seen ? 0 : INTRO_DELAY_MS);

    const v = ref.current;
    if (v) {
      v.muted = true;
      if (!v.paused && v.readyState >= 3) setPlaying(true);
      else {
        const p = v.play();
        if (p) p.catch(() => {});
      }
    }
    return () => clearTimeout(t);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onPlaying={() => setPlaying(true)}
      className={`hero-video w-full h-full object-cover transition-opacity duration-[2400ms] ease-out ${
        playing && delayOver ? "opacity-[0.16]" : "opacity-0"
      }`}
    >
      <source src="/video/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}
