// Capa de datos: lee el contenido de la web desde Notion.
//
// Si no hay NOTION_TOKEN configurado (por ejemplo, en local antes de crear
// la integración), cada función cae automáticamente al contenido estático
// de src/lib/content.ts — así el sitio nunca se rompe por falta de token,
// solo deja de estar "en vivo".
//
// Requiere una integración interna de Notion (https://www.notion.so/my-integrations)
// compartida con las páginas/bases de datos de la subpágina "Contenido Web"
// y con la base de datos PROYECTOS. Ver README.md para el paso a paso.

import * as fallback from "./content";
import type { Artist, Service, TeamMember } from "./content";
import { driveImageUrl } from "./drive";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_VERSION = "2025-09-03";
const REVALIDATE_SECONDS = 300; // 5 min — "regeneración periódica" acordada en el plan

const ROSTER_DS = "2a6d1078-9a58-80a1-833c-000b0fdd8ced"; // PROYECTOS
const SERVICIOS_DS = "a3e7d523-ec2a-4627-883e-f4d995c59df2";
const EQUIPO_DS = "87eb02e2-9cda-4dbb-b02c-3f24a86871d0";
const HERO_PAGE_ID = "3c2d1078-9a58-8116-805a-fba5fb6cfe3a";
const CONTACTO_PAGE_ID = "3c2d1078-9a58-815f-bc42-c506793615dd";

function hasToken() {
  return Boolean(NOTION_TOKEN);
}

async function notionFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    cache: "force-cache",
    next: { revalidate: REVALIDATE_SECONDS },
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API ${res.status} en ${path}: ${body}`);
  }
  return res.json();
}

async function queryDataSource(dataSourceId: string, body: Record<string, unknown> = {}) {
  const data = await notionFetch(`/data_sources/${dataSourceId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data.results as NotionPage[];
}

async function getBlockChildren(blockId: string) {
  const data = await notionFetch(`/blocks/${blockId}/children?page_size=100`);
  return data.results as NotionBlock[];
}

// ---- Tipos mínimos de la API de Notion que usamos ----
type RichText = { plain_text: string }[];
type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};
type NotionProperty =
  | { type: "title"; title: RichText }
  | { type: "rich_text"; rich_text: RichText }
  | { type: "checkbox"; checkbox: boolean }
  | { type: "number"; number: number | null }
  | { type: "url"; url: string | null }
  | { type: "multi_select"; multi_select: { name: string }[] };
type NotionBlock = {
  id: string;
  type: string;
  heading_2?: { rich_text: RichText };
  heading_3?: { rich_text: RichText };
  paragraph?: { rich_text: RichText };
};

function plainText(rt: RichText | undefined): string {
  return (rt ?? []).map((t) => t.plain_text).join("");
}

function prop(page: NotionPage, name: string): NotionProperty | undefined {
  return page.properties[name];
}

function titleOf(page: NotionPage, name = "Nombre"): string {
  const p = prop(page, name);
  return p?.type === "title" ? plainText(p.title) : "";
}

function richTextOf(page: NotionPage, name: string): string {
  const p = prop(page, name);
  return p?.type === "rich_text" ? plainText(p.rich_text) : "";
}

function urlOf(page: NotionPage, name: string): string | undefined {
  const p = prop(page, name);
  return p?.type === "url" ? p.url ?? undefined : undefined;
}

function multiSelectOf(page: NotionPage, name: string): string[] {
  const p = prop(page, name);
  return p?.type === "multi_select" ? p.multi_select.map((o) => o.name) : [];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// Convierte los bloques de una página en un mapa { encabezado -> texto } usando
// cada heading_2/heading_3 como clave y concatenando los párrafos siguientes
// hasta el próximo heading.
function sectionsFromBlocks(blocks: NotionBlock[]): Record<string, string> {
  const sections: Record<string, string> = {};
  let currentKey: string | null = null;
  for (const block of blocks) {
    if (block.type === "heading_2" || block.type === "heading_3") {
      const heading = plainText(block[block.type]?.rich_text);
      currentKey = heading.trim().toLowerCase();
      sections[currentKey] = "";
    } else if (block.type === "paragraph" && currentKey) {
      const text = plainText(block.paragraph?.rich_text);
      if (text) {
        sections[currentKey] = sections[currentKey] ? `${sections[currentKey]} ${text}` : text;
      }
    }
  }
  return sections;
}

function findSection(sections: Record<string, string>, startsWith: string): string | undefined {
  const key = Object.keys(sections).find((k) => k.startsWith(startsWith.toLowerCase()));
  const value = key ? sections[key] : undefined;
  if (!value || value.trim().toLowerCase() === "*(pendiente)*" || value.trim() === "(pendiente)") {
    return undefined;
  }
  return value;
}

// ---------------------------------------------------------------------------

export async function getRoster(): Promise<Artist[]> {
  if (!hasToken()) return fallback.roster;
  try {
    const pages = await queryDataSource(ROSTER_DS, {
      filter: { property: "Mostrar en roster web", checkbox: { equals: true } },
      sorts: [{ property: "Orden", direction: "ascending" }],
    });
    return pages.map((page) => {
      const name = titleCase(titleOf(page));
      const genres = multiSelectOf(page, "Etiquetas");
      return {
        slug: slugify(name),
        name,
        genre: genres.length ? genres.join(", ") : "Roster N.MUSIKA",
        photo: driveImageUrl(urlOf(page, "Foto (Drive)")),
      };
    });
  } catch (err) {
    console.error("[notion] getRoster falló, usando contenido estático:", err);
    return fallback.roster;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!hasToken()) return fallback.services;
  try {
    const pages = await queryDataSource(SERVICIOS_DS, {
      sorts: [{ property: "Orden", direction: "ascending" }],
    });
    return pages.map((page) => ({
      name: titleOf(page),
      description: richTextOf(page, "Descripción"),
    }));
  } catch (err) {
    console.error("[notion] getServices falló, usando contenido estático:", err);
    return fallback.services;
  }
}

export async function getTeam(): Promise<TeamMember[]> {
  if (!hasToken()) return fallback.team;
  try {
    const pages = await queryDataSource(EQUIPO_DS, {
      sorts: [{ property: "Orden", direction: "ascending" }],
    });
    return pages.map((page) => ({
      name: titleOf(page),
      role: richTextOf(page, "Cargo"),
      bio: richTextOf(page, "Bio") || undefined,
      photo: driveImageUrl(urlOf(page, "Foto (Drive)")),
    }));
  } catch (err) {
    console.error("[notion] getTeam falló, usando contenido estático:", err);
    return fallback.team;
  }
}

export async function getHero(): Promise<typeof fallback.hero> {
  if (!hasToken()) return fallback.hero;
  try {
    const blocks = await getBlockChildren(HERO_PAGE_ID);
    const sections = sectionsFromBlocks(blocks);
    return {
      headline: findSection(sections, "titular") ?? fallback.hero.headline,
      cue: findSection(sections, "texto de la seña") ?? fallback.hero.cue,
    };
  } catch (err) {
    console.error("[notion] getHero falló, usando contenido estático:", err);
    return fallback.hero;
  }
}

export async function getContact(): Promise<typeof fallback.contact> {
  if (!hasToken()) return fallback.contact;
  try {
    const blocks = await getBlockChildren(CONTACTO_PAGE_ID);
    const sections = sectionsFromBlocks(blocks);
    return {
      email: findSection(sections, "email") ?? fallback.contact.email,
      phone: findSection(sections, "teléfono") ?? fallback.contact.phone,
      instagram: findSection(sections, "instagram") ?? fallback.contact.instagram,
      location: findSection(sections, "ubicación") ?? fallback.contact.location,
      closingText:
        findSection(sections, "texto de la sección de contacto") ?? fallback.contact.closingText,
    };
  } catch (err) {
    console.error("[notion] getContact falló, usando contenido estático:", err);
    return fallback.contact;
  }
}
