import { bench, describe } from 'vitest';
import { forOwnRight as forOwnRightToolkitCompat_ } from 'es-toolkit/compat';
import { forOwnRight as forOwnRightLodash_ } from 'lodash';

const forOwnRightToolkitCompat = forOwnRightToolkitCompat_;
const forOwnRightLodash = forOwnRightLodash_;

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
