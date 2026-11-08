import { update as updateToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('update - dot notation', () => {
  const obj = { a: { b: { c: 3 } } };

  bench('es-toolkit/update', () => {
    updateToolkitCompat(obj, 'a.b.c', value => (value as number) + 1);
  });

  bench('lodash/update', () => {
    lodash.update(obj, 'a.b.c', value => (value as number) + 1);
  });
});

group('update - array notation', () => {
  const obj = { a: [{ b: { c: 3 } }] };

  bench('es-toolkit/update', () => {
    updateToolkitCompat(obj, 'a[0].b.c', value => (value as number) + 1);
  });

  bench('lodash/update', () => {
    lodash.update(obj, 'a[0].b.c', value => (value as number) + 1);
  });
});

group('update - deep path creation', () => {
  const obj = {};

  bench('es-toolkit/update', () => {
    updateToolkitCompat(obj, 'a.b.c.d.e', () => 'value');
  });

  bench('lodash/update', () => {
    lodash.update(obj, 'a.b.c.d.e', () => 'value');
  });
});
