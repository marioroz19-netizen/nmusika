export default function Glow() {
  return (
    <>
      <div
        className="fixed rounded-full blur-[130px] z-0 opacity-30 pointer-events-none"
        style={{
          width: 560,
          height: 560,
          background: "var(--color-accent)",
          top: -260,
          left: -220,
        }}
      />
      <div
        className="fixed rounded-full blur-[130px] z-0 opacity-20 pointer-events-none"
        style={{
          width: 460,
          height: 460,
          background: "var(--color-accent2)",
          bottom: -220,
          right: -180,
        }}
      />
    </>
  );
}
