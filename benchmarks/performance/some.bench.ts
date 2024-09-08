import { some as someToolkit } from 'es-toolkit/compat';
import { some as lodashSome } from 'lodash';
import { bench, describe } from 'vitest';

describe('some', () => {
  bench('es-toolkit/some', () => {
    someToolkit([1, 2, 3], number => number % 2 === 0);
    someToolkit([1, 'string'], Number);
    someToolkit([false, false, false], value => value);
    someToolkit([1, false, 'string'], () => true);
  });

  bench('lodash/some', () => {
    lodashSome([1, 2, 3], number => number % 2 === 0);
    lodashSome([1, 'string'], Number);
    lodashSome([false, false, false], value => value);
    lodashSome([1, false, 'string'], () => true);
  });
});
