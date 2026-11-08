import { unset as unsetToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('unset', () => {
  bench('es-toolkit/unset', () => {
    const object = { a: { b: { c: null } } };
    unsetToolkitCompat(object, 'a.b.c');
  });

  bench('lodash/unset', () => {
    const object = { a: { b: { c: null } } };
    lodash.unset(object, 'a.b.c');
  });
});
