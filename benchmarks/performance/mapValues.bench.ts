import { mapValues as mapValuesToolkit } from 'es-toolkit';
import { mapValues as mapValuesCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('mapValues', () => {
  bench('es-toolkit/mapValues', () => {
    do_not_optimize(mapValuesToolkit({ a: 1, b: 2, c: 3 }, value => `${value}a`));
  });

  bench('es-toolkit/compat/mapValues', () => {
    do_not_optimize(mapValuesCompatToolkit({ a: 1, b: 2, c: 3 }, value => `${value}a`));
  });

  bench('lodash/mapValues', () => {
    do_not_optimize(lodash.mapValues({ a: 1, b: 2, c: 3 }, value => `${value}a`));
  });
});
