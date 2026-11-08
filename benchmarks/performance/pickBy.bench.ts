import { pickBy as pickByToolkit } from 'es-toolkit';
import { pickBy as pickByCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('pickBy', () => {
  bench('es-toolkit/pickBy', () => {
    do_not_optimize(pickByToolkit({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number'));
  });

  bench('es-toolkit/compat/pickBy', () => {
    do_not_optimize(pickByCompat({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number'));
  });

  bench('lodash/pickBy', () => {
    do_not_optimize(lodash.pickBy({ foo: 1, bar: '2', baz: 3 }, value => typeof value === 'number'));
  });
});
