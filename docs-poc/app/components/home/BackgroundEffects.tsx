export function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Gradient orbs */}
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-cyan-500/15 blur-[100px]" />
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[80px]" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
