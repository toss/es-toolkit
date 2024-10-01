import { bench, describe } from 'vitest';
import { noop as noopToolkit_ } from 'es-toolkit';
import { noop as noopLodash_ } from 'lodash';

const noopToolkit = noopToolkit_;
const noopLodash = noopLodash_;

describe('noop', () => {
  bench('es-toolkit/noop', () => {
    noopToolkit();
  });

  bench('lodash/noop', () => {
    noopLodash();
  });
});
