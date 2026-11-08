import { matches as matchesToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('matches', () => {
  bench('es-toolkit/matches', () => {
    const isMatch = matchesToolkit({ a: { b: { c: 1 } } });
    do_not_optimize(isMatch({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }));
  });
  bench('lodash/matches', () => {
    const isMatch = lodash.matches({ a: { b: { c: 1 } } });
    do_not_optimize(isMatch({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }));
  });
});
