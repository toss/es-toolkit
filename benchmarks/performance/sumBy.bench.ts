import { bench, describe } from 'vitest';
import { sumBy as sumByToolkit_ } from 'es-toolkit';
import { sumBy as sumByLodash_ } from 'lodash';

const sumByToolkit = sumByToolkit_;
const sumByLodash = sumByLodash_;

describe('sumBy', () => {
  bench('es-toolkit/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    sumByToolkit(items, x => x.a);
  });

  bench('lodash/sumBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    sumByLodash(items, x => x.a);
  });
});
