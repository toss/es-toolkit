import { bench, describe } from 'vitest';
import { matches as matchesToolkit_ } from 'es-toolkit/compat';
import { matches as matchesLodash_ } from 'lodash';

const matchesToolkit = matchesToolkit_;
const matchesLodash = matchesLodash_;

describe('matches', () => {
  bench('es-toolkit/matches', () => {
    const isMatch = matchesToolkit({ a: { b: { c: 1 } } });
    isMatch({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 });
  });
  bench('lodash/matches', () => {
    const isMatch = matchesLodash({ a: { b: { c: 1 } } });
    isMatch({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 });
  });
});
