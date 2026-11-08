import { unzipWith as unzipWithToolkit } from 'es-toolkit';
import { unzipWith as unzipWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('unzipWith', () => {
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

  bench('es-toolkit/compat/unzipWith', () => {
    unzipWithCompatToolkit(
      [
        [1000, 2000],
        [3000, 4000],
        [50000, 60000],
      ],
      (a, b, c) => a + b + c
    );
  });

  bench('lodash/unzipWith', () => {
    lodash.unzipWith(
      [
        [1000, 2000],
        [3000, 4000],
        [50000, 60000],
      ],
      (a, b, c) => a + b + c
    );
  });
});

group('unzipWith, large arrays', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => [i, i + 1]);

  bench('es-toolkit/unzipWith', () => {
    unzipWithToolkit(largeArray, (a, b) => a + b);
  });

  bench('es-toolkit/compat/unzipWith', () => {
    unzipWithCompatToolkit(largeArray, (a, b) => a + b);
  });

  bench('lodash/unzipWith', () => {
    lodash.unzipWith(largeArray, (a, b) => a + b);
  });
});
