import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { stats } from "@/lib/content";
import type { Service } from "@/lib/content";

const cardBase =
  "bg-surface-glass border border-border rounded-[20px] p-6 backdrop-blur-md relative overflow-hidden";

export default function HighlightsBento({ services }: { services: Service[] }) {
  // Buscamos por palabra clave en vez de por posición: así el bento no se
  // desordena si en Notion se agrega/reordena algún servicio (p. ej. Marketing).
  const booking = services.find((s) => /booking|gira|concierto/i.test(s.name));
  const management = services.find((s) => /management|direcci[oó]n|estrategia/i.test(s.name));
  const prensa = services.find((s) => /prensa|comunicaci[oó]n|medios/i.test(s.name));
  const produccion = services.find((s) => /producci[oó]n|grabaci[oó]n|estudio/i.test(s.name));

  if (!booking || !management || !prensa || !produccion) {
    // Salvaguarda: si Servicios en Notion no tiene alguna de estas 4
    // categorías, no rompemos el layout — simplemente no mostramos el bento.
    return null;
  }

  return (
    <Reveal className="py-16">
      <SectionHead pill="Qué hacemos" title="Management integral para tu proyecto musical" />

      <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[130px] gap-4">
        <div
          className={`${cardBase} col-span-2 row-span-2 flex flex-col justify-between`}
          style={{
            background:
              "linear-gradient(135deg, rgba(61,139,255,0.18), rgba(127,95,255,0.12))",
            borderColor: "rgba(61,139,255,0.35)",
          }}
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-accent font-bold mb-2.5">
              Servicio
            </div>
            <h3 className="text-[22px] font-bold tracking-tight mb-2">{management.name}</h3>
            <p className="text-muted text-[13.5px] leading-snug">{management.description}</p>
          </div>
          <Link href="/servicios" className="text-accent text-[13px] font-bold">
            Ver todos los servicios →
          </Link>
        </div>

        <div className={cardBase}>
          <div className="text-[11px] uppercase tracking-[0.1em] text-accent font-bold mb-2.5">
            {booking.name}
          </div>
          <h3 className="text-[22px] font-bold tracking-tight mb-1.5">Conciertos</h3>
          <p className="text-muted text-[13.5px]">{booking.description}</p>
        </div>

        <div className={cardBase}>
          <div className="text-[11px] uppercase tracking-[0.1em] text-accent font-bold mb-2.5">
            {prensa.name}
          </div>
          <h3 className="text-[22px] font-bold tracking-tight mb-1.5">Comunicación</h3>
          <p className="text-muted text-[13.5px]">{prensa.description}</p>
        </div>

        {stats.map((stat) => (
          <div key={stat.label} className={`${cardBase} flex flex-col justify-center`}>
            <div className="text-[44px] font-extrabold tracking-tight">{stat.value}</div>
            <span className="text-muted text-[13px]">{stat.label}</span>
          </div>
        ))}

        <div className={`${cardBase} col-span-2`}>
          <div className="text-[11px] uppercase tracking-[0.1em] text-accent font-bold mb-2.5">
            {produccion.name}
          </div>
          <h3 className="text-[22px] font-bold tracking-tight mb-1.5">Estudio & lanzamientos</h3>
          <p className="text-muted text-[13.5px]">{produccion.description}</p>
        </div>
      </div>
    </Reveal>
  );
}
