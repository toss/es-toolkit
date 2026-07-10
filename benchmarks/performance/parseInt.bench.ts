import { bench, describe } from 'vitest';
import { parseInt as parseIntToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { parseInt: parseIntLodash } = lodash;

describe('parseInt', () => {
  bench('es-toolkit/parseInt', () => {
    parseIntToolkit('10');
  });

  bench('lodash/parseInt', () => {
    parseIntLodash('10');
  });
});
