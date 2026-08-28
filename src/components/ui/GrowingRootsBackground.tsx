const GrowingRootsBackground = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden select-none">
    <div
      className="absolute inset-0 transition-colors duration-500 bg-[#ffffff] dark:hidden"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.035) 1px, transparent 1px),
          linear-gradient(to right, rgba(0, 0, 0, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        backgroundPosition: "center top",
        maskImage: "radial-gradient(circle at 50% 25%, black 45%, rgba(0, 0, 0, 0.1) 90%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 25%, black 45%, rgba(0, 0, 0, 0.1) 90%)",
      }}
    />
    <div
      className="absolute inset-0 transition-colors duration-500 hidden dark:block bg-[#000000]"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        backgroundPosition: "center top",
        maskImage: "radial-gradient(circle at 50% 30%, black 45%, rgba(0, 0, 0, 0.15) 90%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 30%, black 45%, rgba(0, 0, 0, 0.15) 90%)",
      }}
    />
    <div
      className="absolute inset-0 opacity-40 dark:opacity-30"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
        backgroundSize: "100% 160px",
      }}
    />
    <div
      className="absolute inset-0 hidden dark:block opacity-30"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        backgroundSize: "100% 160px",
      }}
    />
  </div>
);

export default GrowingRootsBackground;
