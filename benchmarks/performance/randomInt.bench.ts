import { randomInt as randomIntToolkit } from 'es-toolkit';
import { random as randomLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('randomInt', () => {
  bench('es-toolkit/randomInt', () => {
    randomIntToolkit(1, 10);
  });

  bench('lodash/randomInt', () => {
    randomLodash(1, 10, false);
  });
});
