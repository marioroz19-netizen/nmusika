import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Unbounded({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "N.MUSIKA — Booking & Management",
  description:
    "N.MUSIKA (Musika Profesionalen Elkartea) — agencia de management y booking musical en Pamplona/Iruña.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative bg-bg text-text overflow-x-hidden">
        <Nav />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
