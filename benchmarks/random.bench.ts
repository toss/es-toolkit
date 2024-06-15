import { bench, describe } from 'vitest';
import { random as randomToolkit } from 'es-toolkit';
import { random as randomLodash } from 'lodash';

describe('random', () => {
  bench('es-toolkit', () => {
    randomToolkit(1, 10);
  });

  bench('lodash', () => {
    randomLodash(1, 10, true);
  });
});
