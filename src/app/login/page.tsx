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
              placeholder="•••••••• �����F�c���4W'&�"bb���6�74��S�'FW�B�6�FW�B�&VB�C#�6��G&6\;��6�'&V7F���L:��F��FR�VWf������Т�'WGF��G�S�'7V&֗B �6�74��S�&�B�"r�gV��&�V�FVB��r&r�66V�B��2FW�B�v��FRf��B�6V֖&��B��fW#�&r�66V�Bֆ�fW"G&�6�F����6���'2 ��V�G& ���'WGF�����f�&���6�74��S�&�B�bFW�B�6V�FW"FW�Bׇ2FW�B��WFVB#�vV"&�fFFR���U4��(	B66W6�&W7G&��v�F�������F�c���F�c�����
