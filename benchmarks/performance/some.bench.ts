import { some as someToolkit } from 'es-toolkit';
import { some as lodashSome } from 'lodash';
import { bench, describe } from 'vitest';

describe('some', () => {
  bench('es-toolkit/some', () => {
    someToolkit([], () => true);
    // someToolkit([1, 2, 3, false], Number);
  });

  bench('lodash/some', () => {
    lodashSome([], () => true);
    // lodashSome([1, 2, 3, false], Number);
  });
});
