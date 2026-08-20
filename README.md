## N.MUSIKA — web

Proyecto Next.js (App Router) + Tailwind CSS. Cinco páginas propias: Inicio,
Roster, Servicios, Nosotros y Contacto.

### Arrancar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

### Contenido: Notion o estático

El sitio funciona **sin configurar nada**: si no hay token de Notion, cada
página usa el contenido de ejemplo de `src/lib/content.ts`. En cuanto añadas
el token (ver siguiente sección), el mismo código empieza a leer los datos
reales de Notion automáticamente — no hay que cambiar nada más.

### Conectar con Notion (para que el contenido sea el real, editable por Mario)

1. Ve a https://www.notion.so/my-integrations → **New integration**.
   - Nombre: `N.MUSIKA Web` (o el que prefieras).
   - Workspace: el de N.MUSIKA.
   - Capacidades: solo necesita **Read content** (no hace falta escritura).
2. Copia el **Internal Integration Token** que te da Notion (empieza por `secret_` o `ntn_`).
3. Comparte con esa integración las 4 fuentes de contenido de la web:
   - La base de datos **PROYECTOS** (roster).
   - La base de datos **Servicios**.
   - La base de datos **Equipo**.
   - Las páginas **Hero** y **Contacto**.

   En cada una: botón `···` (arriba a la derecha) → **Connections** → busca
   `N.MUSIKA Web` → conectar. (Si compartes la subpágina "Contenido Web" y
   marcas "incluir subpáginas", cubres Hero, Servicios, Equipo y Contacto de
   una vez.)
4. Crea `.env.local` en la raíz del proyecto (copia `.env.local.example`) y
   pega el token:
   ```
   NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. Reinicia `npm run dev` (o vuelve a desplegar). Ya debería tirar de Notion.

`.env.local` nunca se sube a git. Cuando despliegues (por ejemplo en Vercel),
el mismo `NOTION_TOKEN` se configura como variable de entorno en el panel de
la plataforma de hosting, no en el código.

### Fotos del roster y del equipo

Las fotos se enlazan desde Google Drive (no se suben archivos a Notion, para
no duplicar). En la base de datos correspondiente (PROYECTOS o Equipo), en el
campo **"Foto (Drive)"**, pega el enlace de "Compartir" del archivo en Drive
(`https://drive.google.com/file/d/XXXX/view`). El archivo debe estar
compartido como **"Cualquier usuario con el enlace puede ver"** para que la
imagen cargue en la web. El código lo convierte automáticamente al formato
que necesita `next/image`.

⚠️ Las fotos que ves ahora mismo en el roster (Pies en Tierra, Yorrick
Troman, Ignacio García, Sofa Trio) son **placeholders** que vienen del mockup
de diseño — no están confirmadas como las fotos reales/oficiales de cada
artista. En cuanto Mario ponga el enlace real de Drive en "Foto (Drive)"
de cada fila de PROYECTOS, esas sustituyen a los placeholders sin tocar
código.

### Roster: cómo se decide quién sale en la web

La base de datos PROYECTOS incluye proyectos que no son artistas del roster
(por ejemplo "CICLO PABLO SARASATE"). Por eso tiene una casilla **"Mostrar en
roster web"**: solo las filas marcadas aparecen en la web, ordenadas por el
campo **"Orden"**. El campo **Etiquetas** (multi-select) se usa como género
del artista en la tarjeta; si se deja vacío, se muestra "Roster N.MUSIKA".

### Estructura

```
src/app/            páginas (App Router): /, /roster, /servicios, /nosotros, /contacto
src/components/      componentes compartidos (Nav, Hero, RosterGrid, TeamGrid, ...)
src/lib/content.ts   contenido estático de respaldo (misma forma que los datos de Notion)
src/lib/notion.ts    capa de datos: lee de la API de Notion, con fallback a content.ts
src/lib/drive.ts      convierte enlaces de "compartir" de Drive en URLs de imagen directa
public/               logos, fotos placeholder del roster/equipo
```

### Revalidación

El contenido de Notion se cachea 5 minutos (`revalidate: 300` en
`src/lib/notion.ts`) — cambios en Notion tardan hasta 5 minutos en verse
reflejados en producción, sin necesidad de un rebuild manual. Se puede bajar
ese tiempo o pasar a revalidación por webhook más adelante si hace falta.
