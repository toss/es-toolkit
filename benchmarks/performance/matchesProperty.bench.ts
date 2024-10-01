import { bench, describe } from 'vitest';
import { matchesProperty as matchesPropertyToolkit_ } from 'es-toolkit/compat';
import { matchesProperty as matchesPropertyLodash_ } from 'lodash';

const matchesPropertyToolkit = matchesPropertyToolkit_;
const matchesPropertyLodash = matchesPropertyLodash_;

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
