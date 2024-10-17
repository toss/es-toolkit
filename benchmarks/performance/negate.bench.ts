import { negate as negateToolkit } from 'es-toolkit';
import { negate as negateLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('compact', () => {
  bench('es-toolkit', () => {
    negateToolkit(() => true)();
  });

  bench('lodash', () => {
    negateLodash(() => true)();
  });
});
