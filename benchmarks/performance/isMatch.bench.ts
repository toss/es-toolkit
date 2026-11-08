import { isMatch as isMatchToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isMatch', () => {
  bench('es-toolkit/isMatch', () => {
    do_not_optimize(isMatchToolkit({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } }));
  });
  bench('lodash/isMatch', () => {
    do_not_optimize(lodash.isMatch({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } }));
  });
});
