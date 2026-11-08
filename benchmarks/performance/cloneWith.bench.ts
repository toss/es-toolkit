import { cloneWith as cloneWithToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

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
    do_not_optimize(lodash.cloneWith(obj));
  });
  bench('es-toolkit/compat/cloneWith', () => {
    do_not_optimize(cloneWithToolkitCompat(obj));
  });

  bench('lodash/cloneWith (with customizer)', () => {
    do_not_optimize(lodash.cloneWith(obj, customizer));
  });
  bench('es-toolkit/compat/cloneWith (with customizer)', () => {
    do_not_optimize(cloneWithToolkitCompat(obj, customizer));
  });
});
