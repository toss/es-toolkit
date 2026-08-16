import { bench, describe } from 'vitest';
import { updateWith as updateWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { updateWith: lodashUpdateWith } = lodash;

function customizer(value: unknown) {
  if (value == null) {
    return {};
  }
  return value;
}

describe('updateWith - dot notation', () => {
  const obj = { a: { b: { c: 3 } } };

  bench('es-toolkit/updateWith', () => {
    updateWithToolkitCompat(obj, 'a.b.c', value => (value as number) + 1, customizer);
  });

  bench('lodash/updateWith', () => {
    lodashUpdateWith(obj, 'a.b.c', value => (value as number) + 1, customizer);
  });
});

describe('updateWith - array notation', () => {
  const obj = { a: [{ b: { c: 3 } }] };

  bench('es-toolkit/updateWith', () => {
    updateWithToolkitCompat(obj, 'a[0].b.c', value => (value as number) + 1, customizer);
  });

  bench('lodash/updateWith', () => {
    lodashUpdateWith(obj, 'a[0].b.c', value => (value as number) + 1, customizer);
  });
});

describe('updateWith - custom objects', () => {
  const obj = {};

  bench('es-toolkit/updateWith', () => {
    updateWithToolkitCompat(obj, '[0].a.b.c', value => (value as number) + 1, customizer);
  });

  bench('lodash/updateWith', () => {
    lodashUpdateWith(obj, '[0].a.b.c', value => (value as number) + 1, customizer);
  });
});
