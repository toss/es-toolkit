import path from 'node:path';
import { type DefaultTheme } from 'vitepress';
import { flavors } from './flavors.mts';
import { getSidebarItems } from './getSidebarItems.mts';
import { sortByText } from './sortByText.mts';

const docsRoot = path.resolve(import.meta.dirname, '..', '..');

export interface SidebarLabels {
  guide: string;
  reference: string;
  guideItems: Record<string, string>;
  categories: Record<string, string>;
}

/**
 * Build a route-keyed sidebar map for one locale.
 *
 * Each flavor in `flavors` gets its own sub-tree keyed by its URL prefix.
 * Both Guide and Reference items are driven by the flavor's own spec, so
 * adding a new flavor only requires updating `flavors.mts` and supplying
 * the matching labels here.
 */
export function buildFlavorSidebar({
  locale,
  labels,
}: {
  locale: string;
  labels: SidebarLabels;
}): DefaultTheme.Sidebar {
  const localePrefix = locale ? `/${locale}` : '';
  const localeArgs = locale ? [locale] : [];

  const sidebar: DefaultTheme.SidebarMulti = {};

  for (const flavor of flavors) {
    const flavorArgs = flavor.prefix ? [flavor.prefix] : [];
    const flavorPathPrefix = flavor.prefix ? `${localePrefix}/${flavor.prefix}` : localePrefix;

    sidebar[`${flavorPathPrefix}/`] = [
      {
        text: labels.guide,
        items: flavor.guideItems.map(({ labelKey, slug }) => ({
          text: labels.guideItems[labelKey] ?? labelKey,
          link: `${flavorPathPrefix}/${slug}`,
        })),
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
