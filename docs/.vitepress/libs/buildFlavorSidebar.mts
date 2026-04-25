import path from 'node:path';
import { type DefaultTheme } from 'vitepress';
import { flavors, type FlavorSpec } from './flavors.mts';
import { getSidebarItems } from './getSidebarItems.mts';
import { sortByText } from './sortByText.mts';

const docsRoot = path.resolve(import.meta.dirname, '..', '..');

export interface SidebarLabels {
  guide: string;
  reference: string;
  introduction: string;
  installation: string;
  bundleSize: string;
  performance: string;
  aiIntegration: string;
  categories: Record<string, string>;
}

/**
 * Build a route-keyed sidebar map for one locale.
 *
 * Each flavor (see flavors.mts) gets its own sub-tree keyed by its URL prefix:
 *   - `${localePrefix}/${flavor.prefix}/`  for non-default flavors
 *   - `${localePrefix}/`                   for the default (root) flavor
 *
 * Strict guide pages (Intro, Usage, ...) are listed for the default flavor only.
 * Other flavors get a single Introduction item pointing at their `intro` page.
 */
export function buildFlavorSidebar(locale: string, labels: SidebarLabels): DefaultTheme.Sidebar {
  const localePrefix = locale ? `/${locale}` : '';
  const localeArgs = locale ? [locale] : [];

  const sidebar: DefaultTheme.SidebarMulti = {};

  for (const flavor of flavors) {
    const flavorArgs = flavor.prefix ? [flavor.prefix] : [];
    const flavorPathPrefix = flavor.prefix ? `${localePrefix}/${flavor.prefix}` : localePrefix;
    const routeKey = `${flavorPathPrefix}/`;

    sidebar[routeKey] = [
      {
        text: labels.guide,
        items: buildGuideItems(flavor, localePrefix, flavorPathPrefix, labels),
      },
      {
        text: labels.reference,
        items: sortByText(
          flavor.categories.map(category => ({
            text: labels.categories[category] ?? category,
            collapsed: true,
            items: getSidebarItems(docsRoot, ...localeArgs, ...flavorArgs, 'reference', category),
          }))
        ),
      },
    ];
  }

  return sidebar;
}

function buildGuideItems(
  flavor: FlavorSpec,
  localePrefix: string,
  flavorPathPrefix: string,
  labels: SidebarLabels
): DefaultTheme.SidebarItem[] {
  if (flavor.prefix) {
    return [{ text: labels.introduction, link: `${flavorPathPrefix}/intro` }];
  }

  return [
    { text: labels.introduction, link: `${localePrefix}/intro` },
    { text: labels.installation, link: `${localePrefix}/usage` },
    { text: labels.bundleSize, link: `${localePrefix}/bundle-size` },
    { text: labels.performance, link: `${localePrefix}/performance` },
    { text: labels.aiIntegration, link: `${localePrefix}/ai-integration` },
  ];
}
