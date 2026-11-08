import { join as joinToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('join', () => {
  bench('es-toolkit', () => {
    joinToolkit([1, 2, 3], ',');
  });

  bench('lodash', () => {
    lodash.join([1, 2, 3], ',');
  });
});

group('join/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit', () => {
    joinToolkit(largeArray, ',');
  });

  bench('lodash', () => {
    lodash.join(largeArray, ',');
  });
});
