import { bench, describe } from 'vitest';
import { repeat as repeatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { repeat: repeatLodash } = lodash;

describe('repeat', () => {
  bench('es-toolkit/repeat', () => {
    repeatToolkit('abc', 2);
  });

  bench('lodash/repeat', () => {
    repeatLodash('abc', 2);
  });
});
