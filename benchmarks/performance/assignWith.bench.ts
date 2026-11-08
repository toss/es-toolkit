import { assignWith as assignWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('assignWith', () => {
  bench('es-toolkit/assignWith', () => {
    do_not_optimize(
      assignWithToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
        return objValue === undefined ? srcValue : objValue;
      })
    );
  });

  bench('lodash/assignWith', () => {
    do_not_optimize(
      lodash.assignWith({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
        return objValue === undefined ? srcValue : objValue;
      })
    );
  });
});
