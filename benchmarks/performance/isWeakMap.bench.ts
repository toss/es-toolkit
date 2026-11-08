import { isWeakMap as isWeakMapToolkit } from 'es-toolkit';
import { isWeakMap as isWeakMapToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isWeakMap', () => {
  bench('es-toolkit/isWeakMap', () => {
    do_not_optimize(isWeakMapToolkit(new WeakMap()));
    do_not_optimize(isWeakMapToolkit(new Map()));
    do_not_optimize(isWeakMapToolkit(''));
    do_not_optimize(isWeakMapToolkit(123));
  });
  bench('es-toolkit/compat/isWeakMap', () => {
    do_not_optimize(isWeakMapToolkitCompat(new WeakMap()));
    do_not_optimize(isWeakMapToolkitCompat(new Map()));
    do_not_optimize(isWeakMapToolkitCompat(''));
    do_not_optimize(isWeakMapToolkitCompat(123));
  });

  bench('lodash/isWeakMap', () => {
    do_not_optimize(lodash.isWeakMap(new WeakMap()));
    do_not_optimize(lodash.isWeakMap(new Map()));
    do_not_optimize(lodash.isWeakMap(''));
    do_not_optimize(lodash.isWeakMap(123));
  });
});
