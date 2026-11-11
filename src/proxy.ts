import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, hashPassword } from "./lib/auth";

// Puerta de contraseña muy simple para toda la web mientras esté en fase
// privada. No requiere ningún servicio de pago: solo compara la contraseña
// introducida con la variable de entorno SITE_PASSWORD y, si coincide, deja
// una cookie con el hash de la contraseña (nunca la contraseña en sí),
// válida 30 días.
//
// Si SITE_PASSWORD no está configurada, la web queda abierta (no rompe nada
// por falta de variable) — así el despliegue nunca se bloquea a sí mismo.

export async function proxy(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;

  // Sin contraseña configurada: no protegemos nada.
  if (!sitePassword) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === (await hashPassword(sitePassword))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!login|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
