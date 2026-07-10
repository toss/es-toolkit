import { bench, describe } from 'vitest';
import { forOwn as forOwnToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { forOwn: forOwnLodash } = lodash;

describe('forOwn', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const iteratee = (value: number, key: string, object: typeof obj) => [value, key, object];

  bench('es-toolkit/compat/forOwn', () => {
    forOwnToolkitCompat(obj, iteratee);
  });

  bench('lodash/forOwn', () => {
    forOwnLodash(obj, iteratee);
  });
});
