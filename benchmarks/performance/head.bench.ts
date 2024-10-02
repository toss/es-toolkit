import { bench, describe } from 'vitest';
import { head as headToolkit_ } from 'es-toolkit';
import { head as headCompatToolkit_ } from 'es-toolkit/compat';
import { head as headLodash_ } from 'lodash';

const headToolkit = headToolkit_;
const headCompatToolkit = headCompatToolkit_;
const headLodash = headLodash_;

describe('head', () => {
  bench('es-toolkit/head', () => {
    headToolkit([1, 2, 3, 4]);
  });

  bench('es-toolkit/compat/head', () => {
    headCompatToolkit([1, 2, 3, 4]);
  });

  bench('lodash/head', () => {
    headLodash([1, 2, 3, 4]);
  });
});

describe('head/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/head', () => {
    headToolkit(largeArray);
  });

  bench('es-toolkit/compat/head', () => {
    headCompatToolkit(largeArray);
  });

  bench('lodash/head', () => {
    headLodash(largeArray);
  });
});
