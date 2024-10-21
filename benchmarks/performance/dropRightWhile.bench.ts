import { dropRightWhile as dropRightWhileToolkit } from 'es-toolkit';
import { dropRightWhile as dropRightWhileToolkitCompat } from 'es-toolkit/compat';
import { dropRightWhile as dropRightWhileLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('dropRightWhile', () => {
  bench('es-toolkit/dropRightWhile', () => {
    dropRightWhileToolkit([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('es-toolkit (compat)/dropRightWhile', () => {
    dropRightWhileToolkitCompat([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('lodash/dropRightWhile', () => {
    dropRightWhileLodash([1.2, 2.3, 3.4], x => x < 2);
  });
});

describe('dropRightWhile/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropRightWhile', () => {
    dropRightWhileToolkit(largeArray, x => x < 5000);
  });

  bench('es-toolkit (compat)/dropRightWhile', () => {
    dropRightWhileToolkitCompat(largeArray, x => x < 5000);
  });

  bench('lodash/dropRightWhile', () => {
    dropRightWhileLodash(largeArray, x => x < 5000);
  });
});
