import { bench, describe } from 'vitest';
import { unset as unsetToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { unset: unsetLodash } = lodash;

describe('unset', () => {
  bench('es-toolkit/unset', () => {
    const object = { a: { b: { c: null } } };
    unsetToolkitCompat(object, 'a.b.c');
  });

  bench('lodash/unset', () => {
    const object = { a: { b: { c: null } } };
    unsetLodash(object, 'a.b.c');
  });
});
