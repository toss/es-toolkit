import { isWeakSet as isWeakSetToolkit } from 'es-toolkit';
import { isWeakSet as isWeakSetToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isWeakSet', () => {
  bench('es-toolkit/isWeakSet', () => {
    do_not_optimize(isWeakSetToolkit(new WeakMap()));
    do_not_optimize(isWeakSetToolkit(new Map()));
    do_not_optimize(isWeakSetToolkit(''));
    do_not_optimize(isWeakSetToolkit(123));
  });
  bench('es-toolkit/compat/isWeakSet', () => {
    do_not_optimize(isWeakSetToolkitCompat(new WeakMap()));
    do_not_optimize(isWeakSetToolkitCompat(new Map()));
    do_not_optimize(isWeakSetToolkitCompat(''));
    do_not_optimize(isWeakSetToolkitCompat(123));
  });

  bench('lodash/isWeakSet', () => {
    do_not_optimize(lodash.isWeakSet(new WeakMap()));
    do_not_optimize(lodash.isWeakSet(new Map()));
    do_not_optimize(lodash.isWeakSet(''));
    do_not_optimize(lodash.isWeakSet(123));
  });
});
