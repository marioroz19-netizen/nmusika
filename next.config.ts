import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de artistas/equipo enlazadas desde Google Drive (ver src/lib/drive.ts)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
