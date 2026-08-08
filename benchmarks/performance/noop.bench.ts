import { bench, describe } from 'vitest';
import { noop as noopToolkit } from 'es-toolkit';
import lodash from 'lodash';

const { noop: noopLodash } = lodash;

describe('noop', () => {
  bench('es-toolkit/noop', () => {
    noopToolkit();
  });

  bench('lodash/noop', () => {
    noopLodash();
  });
});
