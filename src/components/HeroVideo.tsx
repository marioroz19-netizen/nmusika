"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo de fondo del Hero. Mientras no está listo, la pantalla se queda en
// negro (el vídeo es invisible, así que nunca se ve el botón de play que
// algunos móviles muestran si bloquean la reproducción automática). Cuando
// empieza a reproducirse, entra con un fundido.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (!v.paused && v.readyState >= 3) {
      setPlaying(true);
      return;
    }
    const p = v.play();
    if (p) p.catch(() => {});
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
      className={`hero-video w-full h-full object-cover transition-opacity duration-[1800ms] ease-out ${
        playing ? "opacity-[0.16]" : "opacity-0"
      }`}
    >
      <source src="/video/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}
