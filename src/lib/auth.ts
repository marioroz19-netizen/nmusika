// Utilidades compartidas por la puerta de contraseña del sitio (proxy.ts y
// /login). Antes la cookie de sesión guardaba la contraseña en texto plano
// (nmusika_auth = SITE_PASSWORD), así que cualquiera con acceso a la cookie
// (navegador compartido, copia de seguridad del dispositivo, etc.) obtenía
// la contraseña real, no solo una sesión válida. Ahora la cookie guarda un
// hash SHA-256 de la contraseña: sirve para validar la sesión pero no se
// puede revertir para recuperar la contraseña original.
//
// Se usa la Web Crypto API (crypto.subtle) en vez de el módulo "crypto" de
// Node porque este archivo se ejecuta tanto en el Proxy/Middleware (Edge
// Runtime, sin módulos de Node) como en el server action de /login (Node).
// crypto.subtle está disponible en ambos entornos.

export const COOKIE_NAME = "nmusika_auth";

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
