import { bench, describe } from 'vitest';
import { unary as unaryToolkit } from 'es-toolkit';
import { unary as unaryLodash } from 'lodash';

describe('ary', () => {
  bench('es-toolkit/unary', () => {
    unaryToolkit((a, b, c) => undefined);
  });

  bench('lodash/unary', () => {
    unaryLodash((a, b, c) => undefined);
  });
});
