import { max as maxToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('max', () => {
  bench('es-toolkit/max', () => {
    maxToolkit([1, 2, 3]);
  });

  bench('lodash/max', () => {
    lodash.max([1, 2, 3]);
  });
});

group('max/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/max', () => {
    maxToolkit(largeArray);
  });

  bench('lodash/max', () => {
    lodash.max(largeArray);
  });
});
