import { toFilled as toFilledToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('fill function performance comparison', () => {
  bench('es-toolkit/toFilled', () => {
    toFilledToolkit([1, 2, 3, 4, 5], '*');
  });

  bench('lodash/fill', () => {
    lodash.fill([1, 2, 3, 4, 5], '*');
  });
});

group('fill function performance with custom start and end', () => {
  bench('es-toolkit/toFilled', () => {
    toFilledToolkit([1, 2, 3, 4, 5], '*', 1, 3);
  });

  bench('lodash/fill', () => {
    lodash.fill([1, 2, 3, 4, 5], '*', 1, 3);
  });
});

group('fill function performance with large array', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);

  bench('es-toolkit/toFilled', () => {
    toFilledToolkit(largeArray, '*');
  });

  bench('lodash/fill', () => {
    lodash.fill(largeArray, '*');
  });
});
