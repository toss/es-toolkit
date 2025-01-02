import { bench, describe } from 'vitest';
import { assignIn as assignInCompatToolkit_ } from 'es-toolkit/compat';
import { assignIn as assignInLodash_ } from 'lodash';

const assignInToolkit = assignInCompatToolkit_;
const assignInLodash = assignInLodash_;

describe('assignIn', () => {
  bench('es-toolkit/assignIn', () => {
    assignInToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });

  bench('lodash/assignIn', () => {
    assignInLodash({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });
});
