import { chunk as chunkToolkit } from 'es-toolkit';
import { chunk as chunkCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('chunk', () => {
  bench('lodash/chunk', () => {
    do_not_optimize(lodash.chunk([1, 2, 3, 4, 5, 6], 3));
  });

  bench('es-toolkit/chunk', () => {
    do_not_optimize(chunkToolkit([1, 2, 3, 4, 5, 6], 3));
  });

  bench('es-toolkit/compat/chunk', () => {
    do_not_optimize(chunkCompatToolkit([1, 2, 3, 4, 5, 6], 3));
  });
});

group('chunk/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('lodash/chunk', () => {
    do_not_optimize(lodash.chunk(largeArray, 100));
  });

  bench('es-toolkit/chunk', () => {
    do_not_optimize(chunkToolkit(largeArray, 100));
  });

  bench('es-toolkit/compat/chunk', () => {
    do_not_optimize(chunkCompatToolkit(largeArray, 100));
  });
});
