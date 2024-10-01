import { bench, describe } from 'vitest';
import { unzipWith as unzipWithToolkit } from 'es-toolkit';
import { unzipWith as unzipWithLodash } from 'lodash';

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
