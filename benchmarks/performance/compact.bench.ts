import { compact as compactToolkit } from 'es-toolkit';
import { compact as compactToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('compact', () => {
  bench('es-toolkit', () => {
    compactToolkit([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });

  bench('es-toolkit/compat', () => {
    compactToolkitCompat([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });

  bench('lodash', () => {
    lodash.compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
  });
});

group('compact/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => (i % 10 === 0 ? undefined : i));

  bench('es-toolkit', () => {
    compactToolkit(largeArray);
  });

  bench('es-toolkit/compat', () => {
    compactToolkitCompat(largeArray);
  });

  bench('lodash', () => {
    lodash.compact(largeArray);
  });
});
