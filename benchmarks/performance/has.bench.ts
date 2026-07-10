import { bench, describe } from 'vitest';
import { has as hasToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { has: hasLodash } = lodash;

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
