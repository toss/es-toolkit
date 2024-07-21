import { bench, describe } from 'vitest';
import { random as randomToolkit } from 'es-toolkit';
import { random as randomLodash } from 'lodash';

describe('random', () => {
  bench('es-toolkit/random', () => {
    randomToolkit(1, 10);
  });

  bench('lodash/random', () => {
    randomLodash(1, 10, true);
  });
});
