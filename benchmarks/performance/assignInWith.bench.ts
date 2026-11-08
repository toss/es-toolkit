import { assignInWith as assignInWithToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('assignInWith', () => {
  bench('es-toolkit/assignInWith', () => {
    do_not_optimize(
      assignInWithToolkit({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
        return objValue === undefined ? srcValue : objValue;
      })
    );
  });

  bench('lodash/assignInWith', () => {
    do_not_optimize(
      lodash.assignInWith({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 }, (objValue, srcValue) => {
        return objValue === undefined ? srcValue : objValue;
      })
    );
  });
});
