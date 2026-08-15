import { bench, describe } from 'vitest';
import { assignIn as assignInToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { assignIn: assignInLodash } = lodash;

describe('assignIn', () => {
  bench('es-toolkit/assignIn', () => {
    assignInToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });

  bench('lodash/assignIn', () => {
    assignInLodash({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 });
  });
});
