import { bench, describe } from 'vitest';
import { matchesProperty as matchesPropertyToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { matchesProperty: matchesPropertyLodash } = lodash;

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
