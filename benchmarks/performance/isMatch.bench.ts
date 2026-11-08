import { isMatch as isMatchToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isMatch', () => {
  bench('es-toolkit/isMatch', () => {
    isMatchToolkit({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
  bench('lodash/isMatch', () => {
    lodash.isMatch({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
});
