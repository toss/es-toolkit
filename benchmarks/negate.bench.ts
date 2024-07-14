import { bench, describe } from 'vitest';
import { negate as negateToolkit } from 'es-toolkit';
import { negate as negateLodash } from 'lodash';

describe('compact', () => {
  bench('es-toolkit', () => {
    negateToolkit(() => true)() === false;
  });

  bench('lodash', () => {
    negateLodash(() => true)() === false;
  });
});
