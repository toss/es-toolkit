import { bench, describe } from 'vitest';
import { assignInWith as assignInWithCompatToolkit_ } from 'es-toolkit/compat';
import { assignInWith as assignInWithLodash_ } from 'lodash';

const assignInWithToolkit = assignInWithCompatToolkit_;
const assignInWithLodash = assignInWithLodash_;

describe('assignInWith', () => {
  bench('es-toolkit/assignInWith', () => {
    assignInWithToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
      return objValue === undefined ? srcValue : objValue;
    });
  });

  bench('lodash/assignInWith', () => {
    assignInWithLodash({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
      return objValue === undefined ? srcValue : objValue;
    });
  });
});
