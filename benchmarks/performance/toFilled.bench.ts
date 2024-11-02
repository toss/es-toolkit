import { bench, describe } from 'vitest';
import { toFilled as toFilledToolkit_ } from 'es-toolkit';
import { fill as fillLodash_ } from 'lodash';

const fillLodash = fillLodash_;
const toFilledToolkit = toFilledToolkit_;

describe('fill function performance comparison', () => {
  bench('es-toolkit/toFilled', () => {
    toFilledToolkit([1, 2, 3, 4, 5], '*');
  });

  bench('lodash/fill', () => {
    fillLodash([1, 2, 3, 4, 5], '*');
  });
});

describe('fill function performance with custom start and end', () => {
  bench('es-toolkit/toFilled', () => {
    toFilledToolkit([1, 2, 3, 4, 5], '*', 1, 3);
  });

  bench('lodash/fill', () => {
    fillLodash([1, 2, 3, 4, 5], '*', 1, 3);
  });
});

describe('fill function performance with large array', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);

  bench('es-toolkit/toFilled', () => {
    toFilledToolkit(largeArray, '*');
  });

  bench('lodash/fill', () => {
    fillLodash(largeArray, '*');
  });
});
