import { toString } from '../util/toString.ts';

export function normalizeForCase(str: unknown): string {
  // Coerce to string
  if (typeof str !== 'string') {
    str = toString(str);
  }

  // Remove constraction apostrophes
  return (str as string).replace(/['\u2019]/g, '');
}
