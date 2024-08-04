import { bench, describe } from 'vitest';
import { ary as aryToolkit } from 'es-toolkit';
import { ary as aryLodash } from 'lodash';

describe('ary', () => {
  bench('es-toolkit/ary', () => {
    aryToolkit((a, b, c) => undefined, 2);
  });

  bench('lodash/ary', () => {
    aryLodash((a, b, c) => undefined, 2);
  });
});
