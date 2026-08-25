import Image from "next/image";
import { Artist } from "@/lib/content";

export default function RosterGrid({ artists }: { artists: Artist[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {artists.map((artist) => (
        <div
          key={artist.slug}
          className="relative aspect-[1/1.05] rounded-[22px] border border-border overflow-hidden flex items-end p-6"
          style={{
            background: "linear-gradient(160deg, #141c2c, #0a0f18)",
          }}
        >
          {artist.photo && (
            <Image
              src={artist.photo}
              alt={artist.name}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,7,12,0), rgba(5,7,12,0.45) 70%, rgba(5,7,12,0.6))",
            }}
          />
          {!artist.photo && (
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(61,139,255,0.35), transparent 60%)",
              }}
            />
          )}
          <div className="relative z-10">
            <div className="font-extrabold text-[17px] tracking-tight">{artist.name}</div>
            <div className="text-muted text-[11px] uppercase tracking-[0.08em] mt-1">
              {artist.genre}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
