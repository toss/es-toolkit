import { bench, describe } from 'vitest';
import { takeRightWhile as takeRightWhileToolkit } from 'es-toolkit';
import { takeRightWhile as takeRightWhileLodash } from 'lodash';

describe('takeRightWhile', () => {
  bench('es-toolkit', () => {
    takeRightWhileToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('lodash', () => {
    takeRightWhileLodash([5, 4, 3, 2, 1], n => n < 4);
  });
});
