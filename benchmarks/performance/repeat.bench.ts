import { repeat as repeatToolkit } from 'es-toolkit/compat';
import { repeat as repeatLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('repeat', () => {
  bench('es-toolkit/repeat', () => {
    repeatToolkit('abc', 2);
  });

  bench('lodash/repeat', () => {
    repeatLodash('abc', 2);
  });
});
