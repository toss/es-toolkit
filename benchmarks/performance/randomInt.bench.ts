import { bench, describe } from 'vitest';
import { randomInt as randomIntToolkit } from 'es-toolkit';
import lodash from 'lodash';

const { random: randomLodash } = lodash;

describe('randomInt', () => {
  bench('es-toolkit/randomInt', () => {
    randomIntToolkit(1, 10);
  });

  bench('lodash/randomInt', () => {
    randomLodash(1, 10, false);
  });
});
