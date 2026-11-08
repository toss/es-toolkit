import { overEvery as overEveryToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('overEvery', () => {
  bench('es-toolkit/overEvery', () => {
    const overEvery = overEveryToolkit([Boolean, Number.isFinite]);
    overEvery('1');
  });

  bench('lodash/overEvery', () => {
    const overEvery = lodash.overEvery([Boolean, Number.isFinite]);
    overEvery('1');
  });
});
