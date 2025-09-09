import { bench, describe } from 'vitest';
import { cloneWith as cloneWithToolkitCompat_ } from 'es-toolkit/compat';
import { cloneWith as cloneWithLodash_ } from 'lodash';

const cloneWithLodash = cloneWithLodash_;
const cloneWithToolkitCompat = cloneWithToolkitCompat_;

const obj = {
  number: 29,
  string: 'es-toolkit',
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1, b: 'es-toolkit' },
  date: new Date(),
  regex: /abc/g,
  nested: { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() },
};

function customizer(value: any) {
  if (typeof value === 'number') {
    return value * 2;
  }
}

describe('cloneWith', () => {
  bench('lodash/cloneWith', () => {
    cloneWithLodash(obj);
  });
  bench('es-toolkit/compat/cloneWith', () => {
    cloneWithToolkitCompat(obj);
  });

  bench('lodash/cloneWith (with customizer)', () => {
    cloneWithLodash(obj, customizer);
  });
  bench('es-toolkit/compat/cloneWith (with customizer)', () => {
    cloneWithToolkitCompat(obj, customizer);
  });
});
