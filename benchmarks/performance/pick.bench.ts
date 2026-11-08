import { pick as pickToolkit } from 'es-toolkit';
import { pick as pickCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('pick', () => {
  bench('es-toolkit/pick', () => {
    do_not_optimize(pickToolkit({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']));
  });

  bench('es-toolkit/compat/pick', () => {
    do_not_optimize(pickCompatToolkit({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']));
  });

  bench('lodash/pick', () => {
    do_not_optimize(lodash.pick({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']));
  });
});
