import { bench, describe } from 'vitest';
import { matchesProperty as matchesPropertyToolkit } from 'es-toolkit/compat';
import { matchesProperty as matchesPropertyLodash } from 'lodash';

describe('matchesProperty', () => {
  bench('es-toolkit/matchesProperty', () => {
    const isMatch = matchesPropertyToolkit(['address', 'city'], 'New York');
    isMatch({ address: { city: 'New York' } });
  });

  bench('lodash/matchesProperty', () => {
    const isMatch = matchesPropertyLodash(['address', 'city'], 'New York');
    isMatch({ address: { city: 'New York' } });
  });
});
