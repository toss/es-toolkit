import { memoize } from '../../function';

export function memoizeCapped<F extends (...args: Parameters<F>) => unknown>(func: F) {
  const result = memoize(func, {
    getCacheKey(args) {
      const { cache } = result;
      if (cache.size === 500) {
        cache.clear();
      }
      return args;
    },
  });

  return result;
}
