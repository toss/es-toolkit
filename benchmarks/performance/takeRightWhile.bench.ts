import { bench, describe } from 'vitest';
import { takeRightWhile as takeRightWhileToolkit_ } from 'es-toolkit';
import { takeRightWhile as takeRightWhileCompatToolkit_ } from 'es-toolkit/compat';
import { takeRightWhile as takeRightWhileLodash_ } from 'lodash';

const takeRightWhileToolkit = takeRightWhileToolkit_;
const takeRightWhileCompatToolkit = takeRightWhileCompatToolkit_;
const takeRightWhileLodash = takeRightWhileLodash_;

describe('takeRightWhile', () => {
  bench('es-toolkit/takeRightWhile', () => {
    takeRightWhileToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('es-toolkit/compat/takeRightWhile', () => {
    takeRightWhileCompatToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('lodash/takeRightWhile', () => {
    takeRightWhileLodash([5, 4, 3, 2, 1], n => n < 4);
  });
});

describe('takeRightWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/takeRightWhile', () => {
    takeRightWhileToolkit(largeArray, n => n < 100);
  });

  bench('es-toolkit/compat/takeRightWhile', () => {
    takeRightWhileCompatToolkit(largeArray, n => n < 100);
  });

  bench('lodash/takeRightWhile', () => {
    takeRightWhileLodash(largeArray, n => n < 100);
  });
});
