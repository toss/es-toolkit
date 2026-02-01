const features = [
  {
    icon: '⚡',
    title: 'Best performance',
    description: '2-3× better performance in modern JavaScript runtimes compared to other libraries.',
  },
  {
    icon: '📦',
    title: 'Small bundle footprint',
    description: 'Ships up to 97% less JavaScript code compared to alternative libraries.',
  },
  {
    icon: '🔄',
    title: 'Seamless Lodash replacement',
    description: 'Complete compatibility layer to seamlessly replace Lodash.',
  },
  {
    icon: '✨',
    title: 'Modern implementation',
    description: 'Fully leverages modern JavaScript APIs for straightforward implementation.',
  },
  {
    icon: '🛡️',
    title: 'Robust types',
    description: 'Simple yet robust TypeScript types for all functions.',
  },
  {
    icon: '🌍',
    title: 'Widely adopted',
    description: 'Trusted by Storybook, Recharts, ink, MUI, CKEditor and more.',
  },
  {
    icon: '✅',
    title: 'Battle-tested',
    description: '100% test coverage ensuring maximum robustness.',
  },
  {
    icon: '🚀',
    title: 'Comprehensive runtime support',
    description: 'Supports Node.js, Deno, Bun, and browsers.',
  },
];

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="group rounded-2xl border border-fd-border bg-fd-card p-6 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-fd-muted-foreground">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="border-t border-fd-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">Why es-toolkit?</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
