import { bench, describe } from 'vitest';
import { toFilled as toFilledToolkit } from 'es-toolkit';
import { fill as fillLodash } from 'lodash';

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
