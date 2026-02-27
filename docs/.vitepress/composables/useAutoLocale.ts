const LOCALE_PREFIXES = ['/ko', '/ja', '/zh_hans'];

export function useAutoLocale() {
  if (typeof window === 'undefined') {
    return;
  }

  const { pathname } = window.location;

  // Already on a locale path — do nothing
  if (LOCALE_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return;
  }

  const code = (navigator.language ?? '').toLowerCase().split('-')[0];

  const localeMap: Record<string, string> = {
    ko: '/ko',
    ja: '/ja',
    zh: '/zh_hans',
  };

  const prefix = localeMap[code];
  if (prefix) {
    window.location.replace(prefix + pathname);
  }
}
