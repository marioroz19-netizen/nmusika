import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Glow from "@/components/Glow";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "N.MUSIKA — Booking & Management",
  description:
    "N.MUSIKA (Musika Profesionalen Elkartea) — agencia de management y booking musical en Pamplona/Iruña.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col relative bg-bg text-text overflow-x-hidden">
        <Glow />
        <Nav />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
