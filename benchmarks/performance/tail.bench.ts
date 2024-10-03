import { bench, describe } from 'vitest';
import { tail as tailToolkit_ } from 'es-toolkit';
import { tail as tailLodash_ } from 'lodash';

const tailToolkit = tailToolkit_;
const tailLodash = tailLodash_;

describe('tail', () => {
  bench('es-toolkit/tail', () => {
    tailToolkit([1, 2, 3, 4]);
  });

  bench('lodash/tail', () => {
    tailLodash([1, 2, 3, 4]);
  });
});

describe('tail/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/tail', () => {
    tailToolkit(largeArray);
  });

  bench('lodash/tail', () => {
    tailLodash(largeArray);
  });
});
