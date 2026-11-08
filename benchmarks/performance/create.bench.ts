import { create as createToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('create', () => {
  bench('es-toolkit/compat/create', () => {
    createToolkitCompat({ a: 1 }, { b: 2 });
  });

  bench('lodash/create', () => {
    lodash.create({ a: 1 }, { b: 2 });
  });
});
