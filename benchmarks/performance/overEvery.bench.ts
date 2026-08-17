import { bench, describe } from 'vitest';
import { overEvery as overEveryToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { overEvery: overEveryLodash } = lodash;

describe('overEvery', () => {
  bench('es-toolkit/overEvery', () => {
    const overEvery = overEveryToolkit([Boolean, Number.isFinite]);
    overEvery('1');
  });

  bench('lodash/overEvery', () => {
    const overEvery = overEveryLodash([Boolean, Number.isFinite]);
    overEvery('1');
  });
});
