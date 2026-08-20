// Convierte un enlace normal de "compartir" de Google Drive
// (https://drive.google.com/file/d/XXXX/view) en una URL de imagen directa
// que <Image> de Next.js puede cargar. Si la URL no tiene ese formato (o no
// hay URL), se devuelve tal cual / undefined.
//
// Requisito en Drive: el archivo debe compartirse como "Cualquier usuario
// con el enlace puede ver" para que la imagen cargue sin iniciar sesión.
export function driveImageUrl(url: string | undefined, width = 1200): string | undefined {
  if (!url) return undefined;
  const match = url.match(/\/file\/d\/([^/]+)/) ?? url.match(/[?&]id=([^&]+)/);
  const fileId = match?.[1];
  if (!fileId) return url;
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}
