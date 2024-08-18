import { bench, describe } from 'vitest';
import { round as roundToolkit } from 'es-toolkit';
import { round as roundLodash } from 'lodash';

describe('round', () => {
  bench('es-toolkit/round', () => {
    roundToolkit(1.2345, 2);
  });

  bench('lodash/round', () => {
    roundLodash(1.2345, 2);
  });
});
