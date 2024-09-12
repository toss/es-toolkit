export function normalizeForCase(str: string | object): string {
  if (typeof str === 'object') {
    str = String(str);
  }
  // Remove constraction apostrophes
  str = str.replace(/['\u2019]/g, '');

  return str;
}
