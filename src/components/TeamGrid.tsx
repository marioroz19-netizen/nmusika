import Image from "next/image";
import { TeamMember } from "@/lib/content";

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
      {members.map((member) => (
        <div
          key={member.name}
          className="relative aspect-[4/5] rounded-[18px] border border-border overflow-hidden flex items-end p-5"
          style={{ background: "linear-gradient(160deg, #141c2c, #0a0f18)" }}
        >
          {member.photo && (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 50vw, 280px"
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
          {!member.photo && (
            <div
              className="absolute inset-0 opacity-55"
              style={{
                background:
                  "radial-gradient(circle at 30% 15%, rgba(127,95,255,0.3), transparent 60%)",
              }}
            />
          )}
          <div className="relative z-10">
            <div className="font-extrabold text-[15px] tracking-tight">{member.name}</div>
            <div className="text-muted text-[11px] uppercase tracking-[0.08em] mt-0.5">
              {member.role}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
