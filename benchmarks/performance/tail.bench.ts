import { tail as tailToolkit } from 'es-toolkit';
import { tail as tailToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('tail', () => {
  bench('es-toolkit/tail', () => {
    tailToolkit([1, 2, 3, 4]);
  });

  bench('es-toolkit/compat/tail', () => {
    tailToolkitCompat([1, 2, 3, 4]);
  });

  bench('lodash/tail', () => {
    lodash.tail([1, 2, 3, 4]);
  });
});

group('tail/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/tail', () => {
    tailToolkit(largeArray);
  });

  bench('es-toolkit/compat/tail', () => {
    tailToolkitCompat(largeArray);
  });

  bench('lodash/tail', () => {
    lodash.tail(largeArray);
  });
});
