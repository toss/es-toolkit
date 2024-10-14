import { sum as sumToolkit } from 'es-toolkit';
import { sum as sumLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('sum', () => {
  bench('es-toolkit/sum', () => {
    sumToolkit([1, 2, 3]);
  });

  bench('lodash/sum', () => {
    sumLodash([1, 2, 3]);
  });
});

describe('sum/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sum', () => {
    sumToolkit(largeArray);
  });

  bench('lodash/sum', () => {
    sumLodash(largeArray);
  });
});
