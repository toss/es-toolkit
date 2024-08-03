import { bench, describe } from 'vitest';
import { memoize } from 'es-toolkit';
import { memoize as lodashMemoize } from 'lodash';

describe('memoize', () => {
  const object = { a: 1, b: 2, c: 3 };
  const other = { d: 4, e: 5, f: 6 };
  const values = (args: object) => {
    return Object.values(args);
  };
  bench('es-toolkit/memoize', () => {
    const memoized = memoize(values);
    memoized(object);
    memoized(object); // cached
    memoized(other);
    memoized(other); // cached
  });

  bench('lodash/memoize', () => {
    const memoized = lodashMemoize(values);
    memoized(object);
    memoized(object); // cached
    memoized(other);
    memoized(other); // cached
  });
});
