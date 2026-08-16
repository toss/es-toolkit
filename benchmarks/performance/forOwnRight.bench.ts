import { bench, describe } from 'vitest';
import { forOwnRight as forOwnRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { forOwnRight: forOwnRightLodash } = lodash;

describe('forOwnRight', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const iteratee = (value: number, key: string, object: typeof obj) => [value, key, object];

  bench('es-toolkit/compat/forOwnRight', () => {
    forOwnRightToolkitCompat(obj, iteratee);
  });

  bench('lodash/forOwnRight', () => {
    forOwnRightLodash(obj, iteratee);
  });
});
