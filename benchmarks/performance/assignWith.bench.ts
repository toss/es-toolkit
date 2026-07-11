import { bench, describe } from 'vitest';
import { assignWith as assignWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { assignWith: assignWithLodash } = lodash;

describe('assignWith', () => {
  bench('es-toolkit/assignWith', () => {
    assignWithToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
      return objValue === undefined ? srcValue : objValue;
    });
  });

  bench('lodash/assignWith', () => {
    assignWithLodash({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
      return objValue === undefined ? srcValue : objValue;
    });
  });
});
