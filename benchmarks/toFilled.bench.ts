import { bench, describe } from 'vitest';
import { fill as fillLodash } from 'lodash';
import { toFilled as toFilledToolkit } from 'es-toolkit';

describe('fill function performance comparison', () => {
  bench('es-toolkit/toFilled', () => {
    toFilled([1, 2, 3, 4, 5], '*');
  });

  bench('lodash/fill', () => {
    fillLodash([1, 2, 3, 4, 5], '*');
  });
});

describe('fill function performance with custom start and end', () => {
  bench('es-toolkit/toFilled', () => {
    toFilled([1, 2, 3, 4, 5], '*', 1, 3);
  });

  bench('lodash/fill', () => {
    fillLodash([1, 2, 3, 4, 5], '*', 1, 3);
  });
});
