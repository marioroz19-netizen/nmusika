export default function SectionHead({
  title,
  description,
}: {
  pill?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-12">
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
