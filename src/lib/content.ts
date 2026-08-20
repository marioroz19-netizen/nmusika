// Contenido estático de arranque, reflejando lo que hoy vive en Notion
// (subpágina "Contenido Web" bajo N.MUSIKA). Cuando conectemos la API de
// Notion, estas constantes se sustituirán por fetch() a las bases de datos
// correspondientes — la forma de los datos ya está pensada para eso.

export const hero = {
  headline: "Booking & management",
  cue: "Conócenos",
};

export type Artist = {
  slug: string;
  name: string;
  genre: string;
  photo?: string;
};

export const roster: Artist[] = [
  {
    slug: "pies-en-tierra",
    name: "Pies en Tierra / Oinak Lurrean",
    genre: "Roster N.MUSIKA",
    photo: "/roster/pies-en-tierra.jpg",
  },
  {
    slug: "yorrick-troman",
    name: "Yorrick Troman",
    genre: "Roster N.MUSIKA",
    photo: "/roster/yorrick-troman.jpg",
  },
  {
    slug: "ignacio-garcia",
    name: "Ignacio García",
    genre: "Roster N.MUSIKA",
    photo: "/roster/ignacio-garcia.jpg",
  },
  {
    slug: "orbit-musicians",
    name: "Orbit Musicians",
    genre: "Roster N.MUSIKA",
    // Sin foto todavía — pendiente miniatura de YouTube (aparcado).
  },
  {
    slug: "sofa-trio",
    name: "Sofa Trio",
    genre: "Roster N.MUSIKA",
    photo: "/roster/sofa-trio.jpg",
  },
];

export type Service = {
  name: string;
  description: string;
};

export const services: Service[] = [
  {
    name: "Booking",
    description: "Gestión de conciertos y giras",
  },
  {
    name: "Management",
    description: "Dirección de carrera artística: estrategia, planificación y acompañamiento",
  },
  {
    name: "Prensa y Comunicación",
    description:
      "Difusión y relación con medios: notas de prensa, contacto con periodistas y visibilidad del proyecto.",
  },
  {
    name: "Producción",
    description: "Grabación, lanzamientos y contenido audiovisual: del estudio a la publicación.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
};

export const team: TeamMember[] = [
  {
    name: "Mario Oroz",
    role: "CEO",
    photo: "/team/mario-oroz.jpg",
  },
];

export const contact = {
  email: "marioroz.prod@gmail.com",
  phone: "607582437",
  instagram: "@mariorozz",
  location: "Pamplona / Iruña",
  closingText: "¡Hablemos!",
};

export const stats = [
  { value: "12+", label: "artistas representados" },
  { value: "04", label: "años de trayectoria" },
];
