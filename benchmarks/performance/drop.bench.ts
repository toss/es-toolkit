import { drop as dropToolkit } from 'es-toolkit';
import { drop as dropCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('drop', () => {
  bench('es-toolkit/drop', () => {
    dropToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/compat/drop', () => {
    dropCompatToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash/drop', () => {
    lodash.drop([1, 2, 3, 4, 5, 6], 3);
  });
});

group('drop/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/drop', () => {
    dropToolkit(largeArray, 5000);
  });

  bench('es-toolkit/compat/drop', () => {
    dropCompatToolkit(largeArray, 5000);
  });

  bench('lodash/drop', () => {
    lodash.drop(largeArray, 5000);
  });
});
