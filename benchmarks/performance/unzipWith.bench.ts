import { unzipWith as unzipWithToolkit } from 'es-toolkit';
import { unzipWith as unzipWithLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('unzipWith', () => {
  bench('es-toolkit/unzipWith', () => {
    unzipWithToolkit(
      [
        [1000, 2000],
        [3000, 4000],
        [50000, 60000],
      ],
      (a, b, c) => a + b + c
    );
  });

  bench('lodash/unzipWith', () => {
    unzipWithLodash(
      [
        [1000, 2000],
        [3000, 4000],
        [50000, 60000],
      ],
      (a, b, c) => a + b + c
    );
  });
});

describe('unzipWith, large arrays', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => [i, i + 1]);

  bench('es-toolkit/unzipWith', () => {
    unzipWithToolkit(largeArray, (a, b) => a + b);
  });

  bench('lodash/unzipWith', () => {
    unzipWithLodash(largeArray, (a, b) => a + b);
  });
});
