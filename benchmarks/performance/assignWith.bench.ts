import { assignWith as assignWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('assignWith', () => {
  bench('es-toolkit/assignWith', () => {
    assignWithToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
      return objValue === undefined ? srcValue : objValue;
    });
  });

  bench('lodash/assignWith', () => {
    lodash.assignWith({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
      return objValue === undefined ? srcValue : objValue;
    });
  });
});
