import { bench, describe } from 'vitest';
import { isMatch as isMatchToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isMatch: isMatchLodash } = lodash;

describe('isMatch', () => {
  bench('es-toolkit/isMatch', () => {
    isMatchToolkit({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
  bench('lodash/isMatch', () => {
    isMatchLodash({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
});
