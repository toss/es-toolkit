import { invokeMap as invokeMapToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('invokeMap', () => {
  const stringArray = ['a', 'b', 'c'];
  const numberObject = { a: 1, b: 2, c: 3 };
  const largeArray = Array.from({ length: 1000 }, (_, i) => String(i));
  const array = ['a', 'b', 'c'];
  const func = function (this: string, left: string, right: string) {
    return left + this.toUpperCase() + right;
  };

  bench('es-toolkit/invokeMap/compat', () => {
    do_not_optimize(invokeMapToolkitCompat(stringArray, 'toUpperCase'));
    do_not_optimize(invokeMapToolkitCompat(numberObject, 'toFixed', 1));
    do_not_optimize(invokeMapToolkitCompat(largeArray, 'toString'));
    do_not_optimize(invokeMapToolkitCompat(array, func, '(', ')'));
  });

  bench('lodash/invokeMap', () => {
    do_not_optimize(lodash.invokeMap(stringArray, 'toUpperCase'));
    do_not_optimize(lodash.invokeMap(numberObject, 'toFixed', 1));
    do_not_optimize(lodash.invokeMap(largeArray, 'toString'));
    do_not_optimize(lodash.invokeMap(array, func, '(', ')'));
  });
});
