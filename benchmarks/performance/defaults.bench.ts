import { bench, describe } from 'vitest';
import { defaults as defaultsToolkitCompat_ } from 'es-toolkit/compat';
import { defaults as defaultsLodash_ } from 'lodash';

const defaultsToolkitCompat = defaultsToolkitCompat_;
const defaultsLodash = defaultsLodash_;

describe('defaults', () => {
  bench('es-toolkit/compat/defaults', () => {
    defaultsToolkitCompat({ a: 1 }, { a: 2, b: 2 });
    defaultsToolkitCompat({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });

  bench('lodash/defaults', () => {
    defaultsLodash({ a: 1 }, { a: 2, b: 2 });
    defaultsLodash({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
  });
});
