import { bench, describe } from 'vitest';
import { memoize as memoizeToolkit_ } from 'es-toolkit';
import { memoize as memoizeLodash_ } from 'lodash';

const memoizeToolkit = memoizeToolkit_;
const memoizeLodash = memoizeLodash_;

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

  bench('lodash/memoize', () => {
    const memoized = memoizeLodash(values);
    memoized(object);
    memoized(object); // cached
    memoized(other);
    memoized(other); // cached
  });
});
