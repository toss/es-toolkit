import { bench, describe } from 'vitest';
import { dropWhile as dropWhileToolkit } from 'es-toolkit';
import { dropWhile as dropWhileToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { dropWhile: dropWhileLodash } = lodash;

describe('dropWhile', () => {
  bench('es-toolkit/dropWhile', () => {
    dropWhileToolkit([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('es-toolkit/compat/dropWhile', () => {
    dropWhileToolkitCompat([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('lodash/dropWhile', () => {
    dropWhileLodash([1.2, 2.3, 3.4], x => x < 2);
  });
});

describe('dropWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropWhile', () => {
    dropWhileToolkit(largeArray, x => x < 5000);
  });

  bench('es-toolkit/compat/dropWhile', () => {
    dropWhileToolkitCompat(largeArray, x => x < 5000);
  });

  bench('lodash/dropWhile', () => {
    dropWhileLodash(largeArray, x => x < 5000);
  });
});
