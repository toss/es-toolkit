import { parseInt as parseIntToolkit } from 'es-toolkit/compat';
import { parseInt as parseIntLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('parseInt', () => {
  bench('es-toolkit/parseInt', () => {
    parseIntToolkit('10');
  });

  bench('lodash/parseInt', () => {
    parseIntLodash('10');
  });
});
