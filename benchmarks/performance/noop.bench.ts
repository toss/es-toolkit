import { noop as noopToolkit } from 'es-toolkit';
import { noop as noopLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('noop', () => {
  bench('es-toolkit/noop', () => {
    noopToolkit();
  });

  bench('lodash/noop', () => {
    noopLodash();
  });
});
