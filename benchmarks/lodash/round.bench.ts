import { bench, describe } from 'vitest';
import { round as roundToolkit } from 'es-toolkit';
import { round as roundLodash } from 'lodash';

describe('round', () => {
  bench('es-toolkit', () => {
    roundToolkit(1.2345, 2);
  })

  bench('lodash', () => {
    roundLodash(1.2345, 2);
  })
});