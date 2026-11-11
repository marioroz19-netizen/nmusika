import type { NextConfig } from "next";

// Política de seguridad de contenido: el sitio no carga scripts, fuentes ni
// estilos de terceros (las fuentes de @fontsource se empaquetan localmente,
// y las fotos de Google Drive pasan por el optimizador de imágenes de
// Next.js, que las sirve en same-origin bajo /_next/image). Por eso casi
// todo puede quedar en 'self'; solo se permiten datos/blobs para imágenes
// inline y el propio dominio de Notion no hace falta aquí porque esas
// llamadas ocurren en el servidor, nunca desde el navegador.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Evita anunciar la tecnología del servidor en cada respuesta.
  poweredByHeader: false,
  images: {
    // Fotos de artistas/equipo enlazadas desde Google Drive (ver src/lib/drive.ts)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
