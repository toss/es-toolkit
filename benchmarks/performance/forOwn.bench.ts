import { bench, describe } from 'vitest';
import { forOwn as forOwnToolkitCompat_ } from 'es-toolkit/compat';
import { forOwn as forOwnLodash_ } from 'lodash';

const forOwnToolkitCompat = forOwnToolkitCompat_;
const forOwnLodash = forOwnLodash_;

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
