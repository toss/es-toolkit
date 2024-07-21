import { isMatch } from '../predicate/isMatch.ts';

export function isMapMatch(target: unknown, source: Map<any, any>) {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Map)) {
    return false;
  }

  for (const [key, value] of source.entries()) {
    if (!isMatch(target.get(key), value)) {
      return false;
    }
  }

  return true;
}
