import { some as someToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('some', () => {
  bench('es-toolkit/some', () => {
    someToolkit([1, 2, 3], number => number % 2 === 0);
    someToolkit([1, 'string'], Number);
    someToolkit([false, false, false], value => value);
    someToolkit([1, false, 'string'], () => true);
  });

  bench('lodash/some', () => {
    lodash.some([1, 2, 3], number => number % 2 === 0);
    lodash.some([1, 'string'], Number);
    lodash.some([false, false, false], value => value);
    lodash.some([1, false, 'string'], () => true);
  });
});

group('some/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);
  const predicate = (number: number) => number > 5000;

  bench('es-toolkit/some', () => {
    someToolkit(largeArray, predicate);
  });

  bench('lodash/some', () => {
    lodash.some(largeArray, predicate);
  });
});
