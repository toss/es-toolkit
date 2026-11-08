import { invokeMap as invokeMapToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('invokeMap', () => {
  const stringArray = ['a', 'b', 'c'];
  const numberObject = { a: 1, b: 2, c: 3 };
  const largeArray = Array.from({ length: 1000 }, (_, i) => String(i));
  const array = ['a', 'b', 'c'];
  const func = function (this: string, left: string, right: string) {
    return left + this.toUpperCase() + right;
  };

  bench('es-toolkit/invokeMap/compat', () => {
    invokeMapToolkitCompat(stringArray, 'toUpperCase');
    invokeMapToolkitCompat(numberObject, 'toFixed', 1);
    invokeMapToolkitCompat(largeArray, 'toString');
    invokeMapToolkitCompat(array, func, '(', ')');
  });

  bench('lodash/invokeMap', () => {
    lodash.invokeMap(stringArray, 'toUpperCase');
    lodash.invokeMap(numberObject, 'toFixed', 1);
    lodash.invokeMap(largeArray, 'toString');
    lodash.invokeMap(array, func, '(', ')');
  });
});
