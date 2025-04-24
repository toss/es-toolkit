import { bench, describe } from 'vitest';
import { update as updateToolkitCompat_ } from 'es-toolkit/compat';
import { update as lodashUpdate_ } from 'lodash';

const updateToolkitCompat = updateToolkitCompat_;
const lodashUpdate = lodashUpdate_;

describe('update - dot notation', () => {
  const obj = { a: { b: { c: 3 } } };

  bench('es-toolkit/update', () => {
    updateToolkitCompat(obj, 'a.b.c', value => (value as number) + 1);
  });

  bench('lodash/update', () => {
    lodashUpdate(obj, 'a.b.c', value => (value as number) + 1);
  });
});

describe('update - array notation', () => {
  const obj = { a: [{ b: { c: 3 } }] };

  bench('es-toolkit/update', () => {
    updateToolkitCompat(obj, 'a[0].b.c', value => (value as number) + 1);
  });

  bench('lodash/update', () => {
    lodashUpdate(obj, 'a[0].b.c', value => (value as number) + 1);
  });
});

describe('update - deep path creation', () => {
  const obj = {};

  bench('es-toolkit/update', () => {
    updateToolkitCompat(obj, 'a.b.c.d.e', () => 'value');
  });

  bench('lodash/update', () => {
    lodashUpdate(obj, 'a.b.c.d.e', () => 'value');
  });
});
