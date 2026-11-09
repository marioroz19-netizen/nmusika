import Image from "next/image";
import { TeamMember } from "@/lib/content";

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
      {members.map((member) => (
        <div
          key={member.name}
          className="relative aspect-[4/5] rounded-[20px] overflow-hidden flex items-end p-5"
          style={{ background: "linear-gradient(165deg, #1c1c1e, #0a0a0b)" }}
        >
          {member.photo && (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, 280px"
              className="object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)" }}
          />
          <div className="relative z-10">
            <div className="font-semibold text-[15px] tracking-[-0.005em]">{member.name}</div>
            <div className="text-muted text-[11px] uppercase tracking-[0.08em] mt-0.5">
              {member.role}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
