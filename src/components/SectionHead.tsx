export default function SectionHead({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const centered = align === "center";
  const mutedClass = invert ? "text-muted-invert" : "text-muted";
  return (
    <div className={`mb-16 max-w-[640px] ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`text-[12px] font-semibold tracking-[0.14em] uppercase ${mutedClass} mb-3.5`}>
          {eyebrow}
        </div>
      )}
      <h2 className="text-[clamp(32px,5.4vw,56px)] font-semibold tracking-[-0.01em] leading-[1.07]">
        {title}
      </h2>
      {description && (
        <p className={`${mutedClass} text-[17px] leading-relaxed mt-3.5`}>{description}</p>
      )}
    </div>
  );
}
