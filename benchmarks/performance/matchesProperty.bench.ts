import { matchesProperty as matchesPropertyToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('matchesProperty', () => {
  bench('es-toolkit/matchesProperty', () => {
    const isMatch = matchesPropertyToolkit(['address', 'city'], 'New York');
    do_not_optimize(isMatch({ address: { city: 'New York' } }));
  });

  bench('lodash/matchesProperty', () => {
    const isMatch = lodash.matchesProperty(['address', 'city'], 'New York');
    do_not_optimize(isMatch({ address: { city: 'New York' } }));
  });
});
