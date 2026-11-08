import { unzipWith as unzipWithToolkit } from 'es-toolkit';
import { unzipWith as unzipWithCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('unzipWith', () => {
  bench('es-toolkit/unzipWith', () => {
    do_not_optimize(
      unzipWithToolkit(
        [
          [1000, 2000],
          [3000, 4000],
          [50000, 60000],
        ],
        (a, b, c) => a + b + c
      )
    );
  });

  bench('es-toolkit/compat/unzipWith', () => {
    do_not_optimize(
      unzipWithCompatToolkit(
        [
          [1000, 2000],
          [3000, 4000],
          [50000, 60000],
        ],
        (a, b, c) => a + b + c
      )
    );
  });

  bench('lodash/unzipWith', () => {
    do_not_optimize(
      lodash.unzipWith(
        [
          [1000, 2000],
          [3000, 4000],
          [50000, 60000],
        ],
        (a, b, c) => a + b + c
      )
    );
  });
});

group('unzipWith, large arrays', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => [i, i + 1]);

  bench('es-toolkit/unzipWith', () => {
    do_not_optimize(unzipWithToolkit(largeArray, (a, b) => a + b));
  });

  bench('es-toolkit/compat/unzipWith', () => {
    do_not_optimize(unzipWithCompatToolkit(largeArray, (a, b) => a + b));
  });

  bench('lodash/unzipWith', () => {
    do_not_optimize(lodash.unzipWith(largeArray, (a, b) => a + b));
  });
});
