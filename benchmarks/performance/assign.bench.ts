import { bench, describe } from 'vitest';
import { assign as assignToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { assign: assignLodash } = lodash;

describe('assign', () => {
  bench('es-toolkit/assign', () => {
    assignToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });

  bench('lodash/assign', () => {
    assignLodash({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });
});
