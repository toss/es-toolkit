import { clone as cloneToolkit } from 'es-toolkit';
import { clone as cloneToolkitCompat } from 'es-toolkit/compat';
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

group('clone', () => {
  bench('es-toolkit/clone', () => {
    do_not_optimize(cloneToolkit(obj));
  });

  bench('es-toolkit/clone/compat', () => {
    do_not_optimize(cloneToolkitCompat(obj));
  });

  bench('lodash/clone', () => {
    do_not_optimize(lodash.clone(obj));
  });
});
