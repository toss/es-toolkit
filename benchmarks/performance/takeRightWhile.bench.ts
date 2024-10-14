import { takeRightWhile as takeRightWhileToolkit } from 'es-toolkit';
import { takeRightWhile as takeRightWhileLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('takeRightWhile', () => {
  bench('es-toolkit/takeRightWhile', () => {
    takeRightWhileToolkit([5, 4, 3, 2, 1], n => n < 4);
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

  bench('lodash/takeRightWhile', () => {
    takeRightWhileLodash(largeArray, n => n < 100);
  });
});
