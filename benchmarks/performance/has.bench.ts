import { bench, describe } from 'vitest';
import { has as hasToolkit_ } from 'es-toolkit/compat';
import { has as hasLodash_ } from 'lodash';

const hasToolkit = hasToolkit_;
const hasLodash = hasLodash_;

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
