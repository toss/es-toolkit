import { bench, describe } from 'vitest';
import { repeat as randomToolkit } from 'es-toolkit/compat';
import { repeat as randomLodash } from 'lodash';

describe('random', () => {
  bench('es-toolkit/repeat', () => {
    randomToolkit('abc', 2);
  });

  bench('lodash/repeat', () => {
    randomLodash('abc', 2);
  });
});
