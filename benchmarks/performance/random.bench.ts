import { bench, describe } from 'vitest';
import { random as randomToolkit } from 'es-toolkit';
import { random as randomCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { random: randomLodash } = lodash;

describe('random', () => {
  bench('es-toolkit/random', () => {
    randomToolkit(1, 10);
  });

  bench('es-toolkit/compat/random', () => {
    randomCompatToolkit(1, 10);
  });

  bench('lodash/random', () => {
    randomLodash(1, 10, true);
  });
});
