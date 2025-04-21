import { bench, describe } from 'vitest';
import { overEvery as overEveryToolkit_ } from 'es-toolkit/compat';
import { overEvery as overEveryLodash_ } from 'lodash';

const overEveryToolkit = overEveryToolkit_;
const overEveryLodash = overEveryLodash_;

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
