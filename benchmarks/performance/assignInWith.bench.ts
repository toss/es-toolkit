import { bench, describe } from 'vitest';
import { assignInWith as assignInWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { assignInWith: assignInWithLodash } = lodash;

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
