import { round as roundToolkit } from 'es-toolkit';
import { round as roundCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('round', () => {
  bench('es-toolkit/round', () => {
    roundToolkit(1.2345, 2);
  });

  bench('es-toolkit/compat/round', () => {
    roundCompat(1.2345, 2);
  });

  bench('lodash/round', () => {
    lodash.round(1.2345, 2);
  });
});

group('round (compat)', () => {
  bench('es-toolkit/compat/round', () => {
    roundCompat(4.006);
    roundCompat(4.006, 0);
    roundCompat(4.016, 2);
    roundCompat(4.1, 2);
    roundCompat(4.4, 2);
    roundCompat(4160, -2);
    roundCompat(4.006, NaN);
    roundCompat(4.016, 2.6);
    roundCompat(5e1, 2);
  });

  bench('lodash/round', () => {
    lodash.round(4.006);
    lodash.round(4.006, 0);
    lodash.round(4.016, 2);
    lodash.round(4.1, 2);
    lodash.round(4.4, 2);
    lodash.round(4160, -2);
    lodash.round(4.006, NaN);
    lodash.round(4.016, 2.6);
    lodash.round(5e1, 2);
  });
});
