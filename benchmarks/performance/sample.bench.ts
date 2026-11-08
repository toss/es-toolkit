import { sample as sampleToolkit } from 'es-toolkit';
import { sample as sampleToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('sample', () => {
  bench('es-toolkit/sample', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(sampleToolkit(array));
  });

  bench('es-toolkit/compat/sample', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(sampleToolkitCompat(array));
  });

  bench('lodash/sample', () => {
    const array = [1, 2, 3, 4, 5];
    do_not_optimize(lodash.sample(array));
  });
});

group('sample/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/sample', () => {
    do_not_optimize(sampleToolkit(largeArray));
  });

  bench('es-toolkit/compat/sample', () => {
    do_not_optimize(sampleToolkitCompat(largeArray));
  });

  bench('lodash/sample', () => {
    do_not_optimize(lodash.sample(largeArray));
  });
});
