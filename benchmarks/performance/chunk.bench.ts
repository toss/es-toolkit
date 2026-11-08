import { chunk as chunkToolkit } from 'es-toolkit';
import { chunk as chunkCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('chunk', () => {
  bench('lodash/chunk', () => {
    lodash.chunk([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/chunk', () => {
    chunkToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/compat/chunk', () => {
    chunkCompatToolkit([1, 2, 3, 4, 5, 6], 3);
  });
});

group('chunk/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('lodash/chunk', () => {
    lodash.chunk(largeArray, 100);
  });

  bench('es-toolkit/chunk', () => {
    chunkToolkit(largeArray, 100);
  });

  bench('es-toolkit/compat/chunk', () => {
    chunkCompatToolkit(largeArray, 100);
  });
});
