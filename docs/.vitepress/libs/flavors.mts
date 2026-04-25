/**
 * Flavor spec for the docs site.
 *
 * Every flavor follows the same shape:
 *   /{flavorPrefix}/{guideSlug}      ← guide pages (the first item is the intro)
 *   /{flavorPrefix}/reference/...    ← function reference
 *
 * The default flavor (es-toolkit) uses `prefix: ''`, so its guide pages live at
 * the root (`/intro`, `/usage`, ...) and reference at `/reference/...`.
 *
 * Adding a new flavor (e.g. color, node) means:
 *   1. Add an entry below with its `guideItems` and `categories`.
 *   2. Provide docs at `/{prefix}/{slug}.md` and `/{prefix}/reference/<category>/...`.
 *   3. Provide labels in each locale file (`guideItems[labelKey]`, `categories[name]`).
 */
export interface GuideItem {
  /** Resolved against `SidebarLabels.guideItems` per locale. */
  labelKey: string;
  /** Slug joined to the flavor's URL prefix. */
  slug: string;
}

export interface FlavorSpec {
  value: string;
  label: string;
  description: string;
  prefix: string;
  guideItems: readonly GuideItem[];
  categories: readonly string[];
  /** SVG path `d` attributes rendered inside a 24x24 stroke icon. */
  icon: readonly string[];
  /** CSS color (or `var(...)`) applied to the icon stroke. */
  iconColor: string;
}

// Icon paths are taken from lucide.dev, drawn on a 24x24 viewBox with
// stroke-width=2, stroke-linecap=round, stroke-linejoin=round, fill=none.
const WRENCH_ICON = [
  'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z',
];
const ARROW_LEFT_RIGHT_ICON = ['M8 3 4 7l4 4', 'M4 7h16', 'm16 21 4-4-4-4', 'M20 17H4'];

export const flavors = [
  {
    value: 'esToolkit',
    label: 'es-toolkit',
    description: 'Strict Utilities',
    prefix: '',
    guideItems: [
      { labelKey: 'introduction', slug: 'intro' },
      { labelKey: 'installation', slug: 'usage' },
      { labelKey: 'bundleSize', slug: 'bundle-size' },
      { labelKey: 'performance', slug: 'performance' },
      { labelKey: 'aiIntegration', slug: 'ai-integration' },
    ],
    categories: [
      'array',
      'function',
      'map',
      'math',
      'object',
      'predicate',
      'promise',
      'set',
      'string',
      'util',
      'error',
    ],
    icon: WRENCH_ICON,
    iconColor: 'var(--vp-c-brand-1)',
  },
  {
    value: 'compat',
    label: 'es-toolkit/compat',
    description: 'Lodash compatibility',
    prefix: 'compat',
    guideItems: [{ labelKey: 'introduction', slug: 'intro' }],
    categories: ['array', 'function', 'math', 'object', 'predicate', 'string', 'util'],
    icon: ARROW_LEFT_RIGHT_ICON,
    iconColor: 'var(--vp-c-warning-1)',
  },
] as const satisfies readonly FlavorSpec[];

export function flavorIntroPath({ flavor, localePrefix }: { flavor: FlavorSpec; localePrefix: string }): string {
  const introSlug = flavor.guideItems[0]?.slug ?? 'intro';
  const flavorPath = flavor.prefix ? `/${flavor.prefix}` : '';
  return `${localePrefix}${flavorPath}/${introSlug}`;
}

export function detectFlavor({ relativePath }: { relativePath: string }): FlavorSpec {
  const segments = relativePath.split('/');
  return flavors.find(f => f.prefix && segments.includes(f.prefix)) ?? flavors[0];
}
