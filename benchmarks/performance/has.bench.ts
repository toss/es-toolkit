import { has as hasToolkit } from 'es-toolkit/compat';
import { has as hasLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('has with string', () => {
  bench('es-toolkit/has', () => {
    hasToolkit({ a: { b: 3 } }, 'a.b');
  });

  bench('lodash/has', () => {
    hasLodash({ a: { b: 3 } }, 'a.b');
  });
});

describe('has with string array', () => {
  bench('es-toolkit/has', () => {
    hasToolkit({ a: { b: 3 } }, ['a', 'b']);
  });

  bench('lodash/has', () => {
    hasLodash({ a: { b: 3 } }, ['a', 'b']);
  });
});
