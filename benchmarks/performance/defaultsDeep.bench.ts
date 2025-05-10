import { bench, describe } from 'vitest';
import { defaultsDeep as defaultsDeepToolkitCompat_ } from 'es-toolkit/compat';
import { defaultsDeep as defaultsDeepLodash_ } from 'lodash';
import { defaultsDeep } from '../../src/compat/object/defaultsDeep';

const defaultsDeepToolkitCompat = defaultsDeepToolkitCompat_;
const defaultsDeepLodash = defaultsDeepLodash_;

describe('defaultsDeep', () => {
  bench('es-toolkit/compat/defaultsDeep (direct import)', () => {
    defaultsDeep({ a: 1 }, { a: 2, b: 2 });
    defaultsDeep({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });

  bench('es-toolkit/compat/defaultsDeep ', () => {
    defaultsDeepToolkitCompat({ a: 1 }, { a: 2, b: 2 });
    defaultsDeepToolkitCompat({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });

  bench('lodash/defaultsDeep', () => {
    defaultsDeepLodash({ a: 1 }, { a: 2, b: 2 });
    defaultsDeepLodash({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });
});
