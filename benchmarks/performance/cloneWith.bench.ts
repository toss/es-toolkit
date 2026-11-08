import { cloneWith as cloneWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

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

group('cloneWith', () => {
  bench('lodash/cloneWith', () => {
    lodash.cloneWith(obj);
  });
  bench('es-toolkit/compat/cloneWith', () => {
    cloneWithToolkitCompat(obj);
  });

  bench('lodash/cloneWith (with customizer)', () => {
    lodash.cloneWith(obj, customizer);
  });
  bench('es-toolkit/compat/cloneWith (with customizer)', () => {
    cloneWithToolkitCompat(obj, customizer);
  });
});
