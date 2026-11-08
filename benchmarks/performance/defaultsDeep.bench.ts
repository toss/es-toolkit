import { defaultsDeep as defaultsDeepToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('defaultsDeep', () => {
  bench('es-toolkit/compat/defaultsDeep ', () => {
    defaultsDeepToolkitCompat({ a: 1 }, { a: 2, b: 2 });
    defaultsDeepToolkitCompat({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });

  bench('lodash/defaultsDeep', () => {
    lodash.defaultsDeep({ a: 1 }, { a: 2, b: 2 });
    lodash.defaultsDeep({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });
});
