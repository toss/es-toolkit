import { bench, describe } from 'vitest';
import { parseInt as parseIntToolkit } from 'es-toolkit/compat';
import { parseInt as parseIntLodash } from 'lodash';

describe('parseInt', () => {
  bench('es-toolkit/parseInt', () => {
    parseIntToolkit('10');
  });

  bench('lodash/parseInt', () => {
    parseIntLodash('10');
  });
});
