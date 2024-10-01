import { bench, describe } from 'vitest';
import { isMatch as isMatchToolkit_ } from 'es-toolkit/compat';
import { isMatch as isMatchLodash_ } from 'lodash';

const isMatchToolkit = isMatchToolkit_;
const isMatchLodash = isMatchLodash_;

describe('isMatch', () => {
  bench('es-toolkit/isMatch', () => {
    isMatchToolkit({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
  bench('lodash/isMatch', () => {
    isMatchLodash({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } });
  });
});
