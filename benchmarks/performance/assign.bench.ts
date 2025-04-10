import { bench, describe } from 'vitest';
import { assign as assignCompatToolkit_ } from 'es-toolkit/compat';
import { assign as assignLodash_ } from 'lodash';

const assignToolkit = assignCompatToolkit_;
const assignLodash = assignLodash_;

describe('assign', () => {
  bench('es-toolkit/assign', () => {
    assignToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });

  bench('lodash/assign', () => {
    assignLodash({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });
});
