import { min as minToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('min', () => {
  bench('es-toolkit/min', () => {
    minToolkit([1, 2, 3]);
  });

  bench('lodash/min', () => {
    lodash.min([1, 2, 3]);
  });
});

group('min/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/min', () => {
    minToolkit(largeArray);
  });

  bench('lodash/min', () => {
    lodash.min(largeArray);
  });
});
