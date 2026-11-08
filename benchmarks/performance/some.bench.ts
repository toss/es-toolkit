import { some as someToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('some', () => {
  bench('es-toolkit/some', () => {
    do_not_optimize(someToolkit([1, 2, 3], number => number % 2 === 0));
    do_not_optimize(someToolkit([1, 'string'], Number));
    do_not_optimize(someToolkit([false, false, false], value => value));
    do_not_optimize(someToolkit([1, false, 'string'], () => true));
  });

  bench('lodash/some', () => {
    do_not_optimize(lodash.some([1, 2, 3], number => number % 2 === 0));
    do_not_optimize(lodash.some([1, 'string'], Number));
    do_not_optimize(lodash.some([false, false, false], value => value));
    do_not_optimize(lodash.some([1, false, 'string'], () => true));
  });
});

group('some/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);
  const predicate = (number: number) => number > 5000;

  bench('es-toolkit/some', () => {
    do_not_optimize(someToolkit(largeArray, predicate));
  });

  bench('lodash/some', () => {
    do_not_optimize(lodash.some(largeArray, predicate));
  });
});
