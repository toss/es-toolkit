import { bench, describe } from 'vitest';
import { memoize as memoizeToolkit } from 'es-toolkit';
import { memoize as memoizeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { memoize: memoizeLodash } = lodash;

describe('memoize', () => {
  const object = { a: 1, b: 2, c: 3 };
  const other = { d: 4, e: 5, f: 6 };
  const values = (args: object) => {
    return Object.values(args);
  };
  bench('es-toolkit/memoize', () => {
    const memoized = memoizeToolkit(values);
    memoized(object);
    memoized(object); // cached
    memoized(other);
    memoized(other); // cached
  });

  bench('es-toolkit/compat/memoize', () => {
    const memoized = memoizeToolkitCompat(values);
    memoized(object);
    memoized(object); // cached
    memoized(other);
    memoized(other); // cached
  });

  bench('lodash/memoize', () => {
    const memoized = memoizeLodash(values);
    memoized(object);
    memoized(object); // cached
    memoized(other);
    memoized(other); // cached
  });
});
