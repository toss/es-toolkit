import { isFinite as isFiniteToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isFinite', () => {
  bench('es-toolkit/isFinite', () => {
    do_not_optimize(isFiniteToolkit(1));
    do_not_optimize(isFiniteToolkit(1.12));
    do_not_optimize(isFiniteToolkit(Infinity));
    do_not_optimize(isFiniteToolkit(-Infinity));
    do_not_optimize(isFiniteToolkit([]));
    do_not_optimize(isFiniteToolkit({}));
    do_not_optimize(isFiniteToolkit('1'));
  });

  bench('lodash/isFinite', () => {
    do_not_optimize(lodash.isFinite(1));
    do_not_optimize(lodash.isFinite(1.12));
    do_not_optimize(lodash.isFinite(Infinity));
    do_not_optimize(lodash.isFinite(-Infinity));
    do_not_optimize(lodash.isFinite([]));
    do_not_optimize(lodash.isFinite({}));
    do_not_optimize(lodash.isFinite('1'));
  });
});
