import { bench, describe } from 'vitest';
import { assignWith as assignWithCompatToolkit_ } from 'es-toolkit/compat';
import { assignWith as assignWithLodash_ } from 'lodash';

const assignWithToolkit = assignWithCompatToolkit_;
const assignWithLodash = assignWithLodash_;

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
