import { bench, describe } from 'vitest';
import { random as randomToolkit_ } from 'es-toolkit';
import { random as randomCompatToolkit_ } from 'es-toolkit/compat';
import { random as randomLodash_ } from 'lodash';

const randomToolkit = randomToolkit_;
const randomCompatToolkit = randomCompatToolkit_;
const randomLodash = randomLodash_;

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
