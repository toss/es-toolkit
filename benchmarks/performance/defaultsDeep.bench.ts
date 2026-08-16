import { bench, describe } from 'vitest';
import { defaultsDeep as defaultsDeepToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { defaultsDeep: defaultsDeepLodash } = lodash;

describe('defaultsDeep', () => {
  bench('es-toolkit/compat/defaultsDeep ', () => {
    defaultsDeepToolkitCompat({ a: 1 }, { a: 2, b: 2 });
    defaultsDeepToolkitCompat({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });

  bench('lodash/defaultsDeep', () => {
    defaultsDeepLodash({ a: 1 }, { a: 2, b: 2 });
    defaultsDeepLodash({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });
});
