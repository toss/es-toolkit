import { sumBy as sumByToolkit } from 'es-toolkit';
import { sumBy as sumByLodash } from 'lodash';
import { bench, describe } from '../bench';

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

describe('sumBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i }));

  bench('es-toolkit/sumBy', () => {
    sumByToolkit(largeArray, x => x.a);
  });

  bench('lodash/sumBy', () => {
    sumByLodash(largeArray, x => x.a);
  });
});
