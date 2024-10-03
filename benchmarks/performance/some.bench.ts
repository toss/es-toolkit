import { bench, describe } from 'vitest';
import { some as someToolkit_ } from 'es-toolkit/compat';
import { some as someLodash_ } from 'lodash';

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

describe('some/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);
  const predicate = (number: number) => number > 5000;

  bench('es-toolkit/some', () => {
    someToolkit(largeArray, predicate);
  });

  bench('lodash/some', () => {
    someLodash(largeArray, predicate);
  });
});
