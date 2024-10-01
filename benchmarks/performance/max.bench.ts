import { bench, describe } from 'vitest';
import { max as maxToolkit_ } from 'es-toolkit/compat';
import { max as maxLodash_ } from 'lodash';

const maxToolkit = maxToolkit_;
const maxLodash = maxLodash_;

describe('max', () => {
  bench('es-toolkit/max', () => {
    maxToolkit([1, 2, 3]);
  });

  bench('lodash/max', () => {
    maxLodash([1, 2, 3]);
  });
});
