import { round as roundToolkit } from 'es-toolkit';
import { round as roundCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('round', () => {
  bench('es-toolkit/round', () => {
    do_not_optimize(roundToolkit(1.2345, 2));
  });

  bench('es-toolkit/compat/round', () => {
    do_not_optimize(roundCompat(1.2345, 2));
  });

  bench('lodash/round', () => {
    do_not_optimize(lodash.round(1.2345, 2));
  });
});

group('round (compat)', () => {
  bench('es-toolkit/compat/round', () => {
    do_not_optimize(roundCompat(4.006));
    do_not_optimize(roundCompat(4.006, 0));
    do_not_optimize(roundCompat(4.016, 2));
    do_not_optimize(roundCompat(4.1, 2));
    do_not_optimize(roundCompat(4.4, 2));
    do_not_optimize(roundCompat(4160, -2));
    do_not_optimize(roundCompat(4.006, NaN));
    do_not_optimize(roundCompat(4.016, 2.6));
    do_not_optimize(roundCompat(5e1, 2));
  });

  bench('lodash/round', () => {
    do_not_optimize(lodash.round(4.006));
    do_not_optimize(lodash.round(4.006, 0));
    do_not_optimize(lodash.round(4.016, 2));
    do_not_optimize(lodash.round(4.1, 2));
    do_not_optimize(lodash.round(4.4, 2));
    do_not_optimize(lodash.round(4160, -2));
    do_not_optimize(lodash.round(4.006, NaN));
    do_not_optimize(lodash.round(4.016, 2.6));
    do_not_optimize(lodash.round(5e1, 2));
  });
});
