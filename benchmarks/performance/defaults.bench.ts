import { defaults as defaultsToolkitCompat } from 'es-toolkit/compat';
import { defaults as defaultsLodash } from 'lodash';
import { bench, describe } from '../bench';

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
