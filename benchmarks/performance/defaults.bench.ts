import { defaults as defaultsToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('defaults', () => {
  bench('es-toolkit/compat/defaults', () => {
    defaultsToolkitCompat({ a: 1 }, { a: 2, b: 2 });
    defaultsToolkitCompat({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });

  bench('lodash/defaults', () => {
    lodash.defaults({ a: 1 }, { a: 2, b: 2 });
    lodash.defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });
});
