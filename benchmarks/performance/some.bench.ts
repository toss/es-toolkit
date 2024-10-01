import { some as someToolkit_ } from 'es-toolkit/compat';
import { some as someLodash_ } from 'lodash';
import { bench, describe } from 'vitest';

const someToolkit = someToolkit_;
const someLodash = someLodash_;

describe('some', () => {
  bench('es-toolkit/some', () => {
    someToolkit([1, 2, 3], number => number % 2 === 0);
    someToolkit([1, 'string'], Number);
    someToolkit([false, false, false], value => value);
    someToolkit([1, false, 'string'], () => true);
  });

  bench('lodash/some', () => {
    someLodash([1, 2, 3], number => number % 2 === 0);
    someLodash([1, 'string'], Number);
    someLodash([false, false, false], value => value);
    someLodash([1, false, 'string'], () => true);
  });
});
