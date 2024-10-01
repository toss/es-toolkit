import { describe, bench } from 'vitest';
import { unset as unsetToolkitCompat_ } from 'es-toolkit/compat';
import { unset as unsetLodash_ } from 'lodash';

const unsetToolkitCompat = unsetToolkitCompat_;
const unsetLodash = unsetLodash_;

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
