import { isMatch } from '../predicate/isMatch.ts';

export function isArrayMatch(target: unknown, source: readonly unknown[]) {
  if (source.length === 0) {
    return true;
  }

  if (!Array.isArray(target)) {
    return false;
  }

  const countedIndex = new Set<number>();

  for (let i = 0; i < source.length; i++) {
    const sourceItem = source[i];
    const index = target.findIndex((targetItem, index) => {
      return isMatch(targetItem, sourceItem) && !countedIndex.has(index);
    });

    if (index === -1) {
      return false;
    }

    countedIndex.add(index);
  }

  return true;
}
