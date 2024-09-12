import { bench, describe } from 'vitest';
import { noop as noopToolkit } from 'es-toolkit';
import { noop as noopLodash } from 'lodash';

describe('noop', () => {
  bench('es-toolkit/noop', () => {
    noopToolkit();
  });

  bench('lodash/noop', () => {
    noopLodash();
  });
});
