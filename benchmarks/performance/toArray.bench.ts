import { bench, describe } from 'vitest';
import { toArray as toArrayToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { toArray: toArrayLodash } = lodash;

describe('toArray', () => {
  bench('es-toolkit/compat/toArray', () => {
    toArrayToolkitCompat({ a: 1, b: 2 });
    toArrayToolkitCompat('abc');
    toArrayToolkitCompat(1);
    toArrayToolkitCompat(null);
    toArrayToolkitCompat(
      new Map([
        ['a', 1],
        ['b', 2],
      ])
    );
  });

  bench('lodash/toArray', () => {
    toArrayLodash({ a: 1, b: 2 });
    toArrayLodash('abc');
    toArrayLodash(1);
    toArrayLodash(null);
    toArrayLodash(
      new Map([
        ['a', 1],
        ['b', 2],
      ])
    );
  });
});
