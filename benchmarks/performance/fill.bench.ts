import { bench, describe } from 'vitest';
import { fill as fillToolkit_ } from 'es-toolkit';
import { fill as fillCompatToolkit_ } from 'es-toolkit/compat';
import { fill as fillLodash_ } from 'lodash';

const fillToolkit = fillToolkit_;
const fillCompatToolkit = fillCompatToolkit_;
const fillLodash = fillLodash_;

describe('fill function performance comparison', () => {
  bench('es-toolkit/fill', () => {
    fillToolkit([1, 2, 3], 10);
  });

  bench('es-toolkit/compat/fill', () => {
    fillCompatToolkit([1, 2, 3], 10);
  });

  bench('lodash/fill', () => {
    fillLodash([1, 2, 3], 10);
  });
});

describe('fill function performance with custom start and end', () => {
  bench('es-toolkit/fill', () => {
    fillToolkit([4, 6, 8, 10], '*', 1, 3);
  });

  bench('es-toolkit/compat/fill', () => {
    fillCompatToolkit([4, 6, 8, 10], '*', 1, 3);
  });

  bench('lodash/fill', () => {
    fillLodash([4, 6, 8, 10], '*', 1, 3);
  });
});
