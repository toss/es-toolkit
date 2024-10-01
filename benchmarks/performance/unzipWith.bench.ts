import { unzipWith as unzipWithToolkit_ } from 'es-toolkit';
import { unzipWith as unzipWithLodash_ } from 'lodash';
import { bench, describe } from 'vitest';

const unzipWithToolkit = unzipWithToolkit_;
const unzipWithLodash = unzipWithLodash_;

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
