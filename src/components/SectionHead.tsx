export default function SectionHead({
  pill,
  title,
  description,
}: {
  pill: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 text-[12px] text-accent bg-accent/10 border border-accent/30 px-4 py-1.5 rounded-full mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        {pill}
      </div>
      <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight max-w-xl mx-auto">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-[15px] max-w-md mx-auto mt-3.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
