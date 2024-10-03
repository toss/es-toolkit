import { bench, describe } from 'vitest';
import { parseInt as parseIntToolkit_ } from 'es-toolkit/compat';
import { parseInt as parseIntLodash_ } from 'lodash';

const parseIntToolkit = parseIntToolkit_;
const parseIntLodash = parseIntLodash_;

describe('parseInt', () => {
  bench('es-toolkit/parseInt', () => {
    parseIntToolkit('10');
  });

  bench('lodash/parseInt', () => {
    parseIntLodash('10');
  });
});
