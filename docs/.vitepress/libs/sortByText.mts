import { DefaultTheme } from 'vitepress';

export function sortByText(items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem[] {
  return items.slice().map(item => {
    if (item.items) {
      item.items = item.items.sort((a, b) => {
        if (typeof a.text === 'string' && typeof b.text === 'string') {
          return a.text.localeCompare(b.text);
        }

        return 0;
      });
    }

    return item;
  });
}
