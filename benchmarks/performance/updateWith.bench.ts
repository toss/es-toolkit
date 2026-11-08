import { updateWith as updateWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

function customizer(value: unknown) {
  if (value == null) {
    return {};
  }
  return value;
}

group('updateWith - dot notation', () => {
  const obj = { a: { b: { c: 3 } } };

  bench('es-toolkit/updateWith', () => {
    do_not_optimize(updateWithToolkitCompat(obj, 'a.b.c', value => (value as number) + 1, customizer));
  });

  bench('lodash/updateWith', () => {
    do_not_optimize(lodash.updateWith(obj, 'a.b.c', value => (value as number) + 1, customizer));
  });
});

group('updateWith - array notation', () => {
  const obj = { a: [{ b: { c: 3 } }] };

  bench('es-toolkit/updateWith', () => {
    do_not_optimize(updateWithToolkitCompat(obj, 'a[0].b.c', value => (value as number) + 1, customizer));
  });

  bench('lodash/updateWith', () => {
    do_not_optimize(lodash.updateWith(obj, 'a[0].b.c', value => (value as number) + 1, customizer));
  });
});

group('updateWith - custom objects', () => {
  const obj = {};

  bench('es-toolkit/updateWith', () => {
    do_not_optimize(updateWithToolkitCompat(obj, '[0].a.b.c', value => (value as number) + 1, customizer));
  });

  bench('lodash/updateWith', () => {
    do_not_optimize(lodash.updateWith(obj, '[0].a.b.c', value => (value as number) + 1, customizer));
  });
});
