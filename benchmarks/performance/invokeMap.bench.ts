import { bench, describe } from 'vitest';
import { invokeMap as invokeMapToolkitCompat_ } from 'es-toolkit/compat';
import { invokeMap as invokeMapLodash_ } from 'lodash';

const invokeMapToolkitCompat = invokeMapToolkitCompat_;
const invokeMapLodash = invokeMapLodash_;

describe('invokeMap', () => {
  const stringArray = ['a', 'b', 'c'];
  const numberObject = { a: 1, b: 2, c: 3 };
  const largeArray = Array.from({ length: 1000 }, (_, i) => String(i));
  const array = ['a', 'b', 'c'];
  const func = function (left, right) {
    return left + this.toUpperCase() + right;
  };

  bench('es-toolkit/invokeMap/compat', () => {
    invokeMapToolkitCompat(stringArray, 'toUpperCase');
    invokeMapToolkitCompat(numberObject, 'toFixed', 1);
    invokeMapToolkitCompat(largeArray, 'toString');
    invokeMapToolkitCompat(array, func, '(', ')');
  });

  bench('lodash/invokeMap', () => {
    invokeMapLodash(stringArray, 'toUpperCase');
    invokeMapLodash(numberObject, 'toFixed', 1);
    invokeMapLodash(largeArray, 'toString');
    invokeMapLodash(array, func, '(', ')');
  });
});
