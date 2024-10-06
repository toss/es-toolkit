import { bench, describe } from 'vitest';
import { randomInt as randomIntToolkit_ } from 'es-toolkit';
import { random as randomLodash_ } from 'lodash';

const randomIntToolkit = randomIntToolkit_;
const randomLodash = randomLodash_;

describe('randomInt', () => {
  bench('es-toolkit/randomInt', () => {
    randomIntToolkit(1, 10);
  });

  bench('lodash/randomInt', () => {
    randomLodash(1, 10, false);
  });
});
