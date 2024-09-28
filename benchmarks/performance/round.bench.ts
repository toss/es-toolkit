import { bench, describe } from 'vitest';
import { round as roundToolkit } from 'es-toolkit';
import { round as roundCompat } from 'es-toolkit/compat';
import { round as roundLodash } from 'lodash';

describe('round', () => {
  bench('es-toolkit/round', () => {
    roundToolkit(1.2345, 2);
  });

  bench('es-toolkit/compat/round', () => {
    roundCompat(1.2345, 2);
  });

  bench('lodash/round', () => {
    roundLodash(1.2345, 2);
  });
});

describe('round (compat)', () => {
  bench('es-toolkit/compat/round', () => {
    roundCompat(4.006);
    roundCompat(4.006, 0);
    roundCompat(4.016, 2);
    roundCompat(4.1, 2);
    roundCompat(4.4, 2);
    roundCompat(4160, -2);
    roundCompat(4.006, NaN);
    roundCompat(4.016, 2.6);
    roundCompat(4.016, '+2');
    roundCompat(5e1, 2);
    roundCompat('5e', 1);
    roundCompat('5e1e1', 1);
  });

  bench('lodash/round', () => {
    roundLodash(4.006);
    roundLodash(4.006, 0);
    roundLodash(4.016, 2);
    roundLodash(4.1, 2);
    roundLodash(4.4, 2);
    roundLodash(4160, -2);
    roundLodash(4.006, NaN);
    roundLodash(4.016, 2.6);
    roundLodash(4.016, '+2');
    roundLodash(5e1, 2);
    roundLodash('5e', 1);
    roundLodash('5e1e1', 1);
  });
});
