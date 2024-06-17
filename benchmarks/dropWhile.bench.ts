import { bench, describe } from 'vitest';
import { dropWhile as dropWhileToolkit } from 'es-toolkit';
import { dropWhile as dropWhileLodash } from 'lodash';

describe('dropWhile', () => {
  bench('es-toolkit/dropWhile', () => {
    dropWhileToolkit([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('lodash/dropWhile', () => {
    dropWhileLodash([1.2, 2.3, 3.4], x => x < 2);
  });
});
