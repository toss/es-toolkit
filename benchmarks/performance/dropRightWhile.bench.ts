import { bench, describe } from 'vitest';
import { dropRightWhile as dropRightWhileToolkit } from 'es-toolkit';
import { dropRightWhile as dropRightWhileLodash } from 'lodash';

describe('dropRightWhile', () => {
  bench('es-toolkit/dropRightWhile', () => {
    dropRightWhileToolkit([1.2, 2.3, 3.4], x => x < 2);
  });

  bench('lodash/dropRightWhile', () => {
    dropRightWhileLodash([1.2, 2.3, 3.4], x => x < 2);
  });
});
