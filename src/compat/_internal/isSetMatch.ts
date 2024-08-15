import { isArrayMatch } from './isArrayMatch.ts';

export function isSetMatch(target: unknown, source: Set<any>) {
  if (source.size === 0) {
    return true;
  }

  if (!(target instanceof Set)) {
    return false;
  }

  return isArrayMatch([...target], [...source]);
}
