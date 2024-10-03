import { bench, describe } from 'vitest';
import { dropWhile as dropWhileToolkit_ } from 'es-toolkit';
import { dropWhile as dropWhileLodash_ } from 'lodash';

const dropWhileToolkit = dropWhileToolkit_;
const dropWhileLodash = dropWhileLodash_;

describe('dropWhile', () => {
  bench('es-toolkit/dropWhile', () => {
    dropWhileToolkit([1.2, 2.3, 3.4], x => x < 2);
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

  bench('lodash/dropWhile', () => {
    dropWhileLodash(largeArray, x => x < 5000);
  });
});
