// Iconos de línea minimalistas, sin dependencias externas — se eligen por
// coincidencia de palabra clave en el nombre del servicio (viene de Notion),
// con un icono genérico de respaldo para cualquier servicio futuro que no
// encaje en ninguna categoría conocida.

function IconBooking() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17" strokeLinecap="round" />
      <path d="M8 3v3.5M16 3v3.5" strokeLinecap="round" />
      <path d="M7.5 13.5l2 2 3.5-3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconManagement() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4l2.6 2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPrensa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor">
      <path
        d="M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l4.2 3.3a.8.8 0 0 0 1.3-.6V6.3a.8.8 0 0 0-1.3-.6L7 9H5.5A1.5 1.5 0 0 0 4 10.5Z"
        strokeLinejoin="round"
      />
      <path d="M16.5 9c1 1 1 5 0 6M19 6.5c2 2.3 2 8.7 0 11" strokeLinecap="round" />
    </svg>
  );
}

function IconProduccion() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor">
      <path
        d="M4 13.5c1-3 2-3 3 0s2 3 3 0 2-6 3 0 2 3 3 0 2-1.5 3-1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3.5" y="4.5" width="17" height="15" rx="3.5" />
    </svg>
  );
}

function IconGeneric() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor">
      <path
        d="M9 18V6.4a1 1 0 0 1 .8-1L18 3.8v11.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="15.5" cy="15.4" r="2.5" />
    </svg>
  );
}

const MATCHERS: Array<{ test: RegExp; Icon: () => React.ReactElement }> = [
  { test: /booking|gira|concierto/i, Icon: IconBooking },
  { test: /management|direcci[oó]n|estrategia/i, Icon: IconManagement },
  { test: /prensa|comunicaci[oó]n|medios/i, Icon: IconPrensa },
  { test: /producci[oó]n|grabaci[oó]n|estudio/i, Icon: IconProduccion },
];

const TONE_CLASSES = {
  // Bloques sólidos y planos, sin borde ni transparencia — el contraste
  // hace el trabajo, no el detalle.
  primary: "bg-accent text-bg",
  secondary: "bg-accent2 text-bg",
  inverse: "bg-bg text-accent",
} as const;

export default function ServiceIcon({
  name,
  size = "md",
  tone = "primary",
}: {
  name: string;
  size?: "md" | "lg";
  tone?: keyof typeof TONE_CLASSES;
}) {
  const match = MATCHERS.find(({ test }) => test.test(name));
  const Icon = match?.Icon ?? IconGeneric;
  const box = size === "lg" ? "w-14 h-14" : "w-12 h-12";
  const glyph = size === "lg" ? "w-7 h-7" : "w-6 h-6";
  return (
    <div className={`${box} flex items-center justify-center ${TONE_CLASSES[tone]}`}>
      <div className={glyph}>
        <Icon />
      </div>
    </div>
  );
}
