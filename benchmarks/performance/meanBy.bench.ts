import { meanBy as meanByToolkit } from 'es-toolkit';
import { meanBy as meanByLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('meanBy', () => {
  bench('es-toolkit/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    meanByToolkit(items, x => x.a);
  });

  bench('lodash/meanBy', () => {
    const items = [{ a: 1 }, { a: 2 }, { a: 3 }];
    meanByLodash(items, x => x.a);
  });
});

describe('meanBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({ a: i }));

  bench('es-toolkit/meanBy', () => {
    meanByToolkit(largeArray, x => x.a);
  });

  bench('lodash/meanBy', () => {
    meanByLodash(largeArray, x => x.a);
  });
});
