import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "nmusika_auth";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/");
  const sitePassword = process.env.SITE_PASSWORD;

  if (sitePassword && password === sitePassword) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, sitePassword, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    redirect(from.startsWith("/") ? from : "/");
  }

  redirect(`/login?error=1&from=${encodeURIComponent(from)}`);
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";
  const from = params.from ?? "/";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-bg">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-lg tracking-wide text-text/90">N·MUSIKA</span>
        </div>
        <form
          action={login}
          className="rounded-2xl border border-border bg-surface p-8 flex flex-col gap-4"
        >
          <input type="hidden" name="from" value={from} />
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-muted">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-text outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>
          {hasError && (
            <p className="text-sm text-red-400">Contraseña incorrecta. Inténtalo de nuevo.</p>
          )}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-accent py-3 text-bg font-bold hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted">
          Web privada de N.MUSIKA — acceso restringido.
        </p>
      </div>
    </div>
  );
}
