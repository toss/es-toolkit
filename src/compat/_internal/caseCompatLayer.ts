export function caseCompatLayer(str: string | object, caseFn: (str: string) => string): string {
  if (typeof str === 'object') {
    str = str.toString();
  }
  // Remove constraction apostrophes
  str = str.replace(/['\u2019]/g, '');

  return caseFn(str);
}
