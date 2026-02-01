import { getTranslation } from '@/lib/translations';

const featureKeys = [
  { key: 'performance', icon: '⚡' },
  { key: 'bundleSize', icon: '📦' },
  { key: 'lodashReplacement', icon: '🔄' },
  { key: 'modernImpl', icon: '✨' },
  { key: 'robustTypes', icon: '🛡️' },
  { key: 'widelyAdopted', icon: '🌍' },
  { key: 'battleTested', icon: '✅' },
  { key: 'runtimeSupport', icon: '🚀' },
] as const;

export function FeaturesSection({ lang = 'en' }: { lang?: string }) {
  const t = getTranslation(lang).home;

  return (
    <section className="border-t border-fd-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">{t.whyEsToolkit}</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map(({ key, icon }) => {
            const feature = t.features[key];
            return (
              <div
                key={key}
                className="group rounded-2xl border border-fd-border bg-fd-card p-6 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="mb-4 text-4xl">{icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-fd-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
