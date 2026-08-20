import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { getContact } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Contacto — N.MUSIKA",
};

export default async function ContactoPage() {
  const contact = await getContact();

  const rows = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Teléfono", value: contact.phone, href: `tel:${contact.phone}` },
    {
      label: "Instagram",
      value: contact.instagram,
      href: `https://instagram.com/${contact.instagram.replace("@", "")}`,
    },
    { label: "Ubicación", value: contact.location },
  ];

  return (
    <div className="max-w-[1180px] mx-auto px-6 pt-40 pb-24 text-center">
      <Reveal>
        <SectionHead pill="Contacto" title={contact.closingText} />
      </Reveal>

      <Reveal>
        <div className="max-w-md mx-auto border-t border-border">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex justify-between items-center py-5 border-b border-border"
            >
              <span className="text-muted text-[13px] uppercase tracking-[0.08em]">
                {row.label}
              </span>
              {row.href ? (
                <a href={row.href} className="text-[15px] font-semibold hover:text-accent transition-colors">
                  {row.value}
                </a>
              ) : (
                <span className="text-[15px] font-semibold">{row.value}</span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
