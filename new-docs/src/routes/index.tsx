import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

const features = [
  {
    icon: '⚡',
    title: 'Best performance',
    description: '2-3× faster than lodash in modern runtimes.',
  },
  {
    icon: '📦',
    title: 'Tiny bundle',
    description: 'Up to 97% smaller than alternatives.',
  },
  {
    icon: '🔄',
    title: 'Lodash compatible',
    description: 'Drop-in replacement via es-toolkit/compat.',
  },
  {
    icon: '🛡️',
    title: 'Type safe',
    description: 'First-class TypeScript support.',
  },
];

const stats = [
  { value: '2-3×', label: 'Faster', color: 'text-emerald-500' },
  { value: '97%', label: 'Smaller', color: 'text-cyan-500' },
  { value: '100%', label: 'Typed', color: 'text-violet-500' },
  { value: '100%', label: 'Tested', color: 'text-amber-500' },
];

const codeExample = `import { chunk, debounce, pick } from 'es-toolkit';

// Split array into chunks
chunk([1, 2, 3, 4, 5], 2);
// => [[1, 2], [3, 4], [5]]

// Debounce function calls
const search = debounce(query => fetch(query), 300);

// Pick object properties
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
// => { a: 1, c: 3 }`;

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Effects */}
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

        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              State-of-the-art utility library
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-center text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              es-toolkit
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-center text-lg text-fd-muted-foreground md:text-xl">
            A blazing fast, lightweight JavaScript utility library.
            <br />
            The modern alternative to Lodash.
          </p>

          {/* Stats */}
          <div className="mb-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl font-bold md:text-4xl ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-fd-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/docs/$"
              params={{ _splat: 'original' }}
              className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/40 active:translate-y-0"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/toss/es-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-fd-border bg-fd-background/80 px-8 py-4 font-semibold backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-fd-border/80 hover:bg-fd-accent active:translate-y-0"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Code Example */}
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-fd-border bg-fd-card/50 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-fd-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-fd-muted-foreground">example.ts</span>
            </div>
            <pre className="overflow-x-auto p-4 text-sm">
              <code className="text-fd-foreground">{codeExample}</code>
            </pre>
          </div>

          {/* Install command */}
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-fd-border bg-fd-background/50 px-5 py-3 font-mono text-sm backdrop-blur-sm">
            <span className="text-fd-muted-foreground">$</span>
            <span>
              <span className="text-emerald-600 dark:text-emerald-400">npm install</span> es-toolkit
            </span>
            <button
              className="ml-2 rounded p-1 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
              onClick={() => navigator.clipboard.writeText('npm install es-toolkit')}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-fd-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">Why es-toolkit?</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(feature => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-fd-border bg-fd-card p-6 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-fd-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-fd-border py-12">
        <p className="text-center text-sm text-fd-muted-foreground">
          Released under the MIT License. Copyright © 2024 Viva Republica, Inc.
        </p>
      </footer>
    </HomeLayout>
  );
}
