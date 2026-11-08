import { unset as unsetToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('unset', () => {
  bench('es-toolkit/unset', () => {
    const object = { a: { b: { c: null } } };
    do_not_optimize(unsetToolkitCompat(object, 'a.b.c'));
  });

  bench('lodash/unset', () => {
    const object = { a: { b: { c: null } } };
    do_not_optimize(lodash.unset(object, 'a.b.c'));
  });
});
