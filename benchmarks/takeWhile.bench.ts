import { bench, describe } from 'vitest';
import { takeWhile as takeWhileToolkit } from 'es-toolkit';
import { takeWhile as takeWhileLodash } from 'lodash';

describe('takeWhile', () => {
  bench('es-toolkit', () => {
    takeWhileToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('lodash', () => {
    takeWhileLodash([5, 4, 3, 2, 1], n => n < 4);
  });
});
