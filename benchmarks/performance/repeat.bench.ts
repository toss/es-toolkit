import { bench, describe } from 'vitest';
import { repeat as repeatToolkit_ } from 'es-toolkit/compat';
import { repeat as repeatLodash_ } from 'lodash';

const repeatToolkit = repeatToolkit_;
const repeatLodash = repeatLodash_;

describe('repeat', () => {
  bench('es-toolkit/repeat', () => {
    repeatToolkit('abc', 2);
  });

  bench('lodash/repeat', () => {
    repeatLodash('abc', 2);
  });
});
