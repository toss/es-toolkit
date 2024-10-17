import { isMatch as isMatchToolkit } from 'es-toolkit/compat';
import { isMatch as isMatchLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('isMatch', () => {
  bench('es-toolkit/isMatch', () => {
    isMatchToolkit({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
  bench('lodash/isMatch', () => {
    isMatchLodash({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
});
