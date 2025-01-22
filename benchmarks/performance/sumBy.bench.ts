import { bench, describe } from 'vitest';
import { sumBy as sumByToolkit_ } from 'es-toolkit';
import { sumBy as sumByToolkitCompat_ } from 'es-toolkit/compat';
import { sumBy as sumByLodash_ } from 'lodash';

const sumByToolkit = sumByToolkit_;
const sumByToolkitCompat = sumByToolkitCompat_;
const sumByLodash = sumByLodash_;

describe('sumBy', () => {
  bench('es-toolkit/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    sumByToolkit(items, x => x.a);
  });

  bench('es-toolkit/compat/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    sumByToolkitCompat(items, x => x.a);
  });

  bench('lodash/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    sumByLodash(items, x => x.a);
  });
});

describe('sumBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i }));

  bench('es-toolkit/sumBy', () => {
    sumByToolkit(largeArray, x => x.a);
  });

  bench('es-toolkit/compat/sumBy', () => {
    sumByToolkitCompat(largeArray, x => x.a);
  });

  bench('lodash/sumBy', () => {
    sumByLodash(largeArray, x => x.a);
  });
});
