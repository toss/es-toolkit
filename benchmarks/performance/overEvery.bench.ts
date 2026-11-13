import { overEvery as overEveryToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('overEvery', () => {
  bench('es-toolkit/overEvery', () => {
    const overEvery = overEveryToolkit([Boolean, Number.isFinite]);
    do_not_optimize(overEvery('1'));
  });

  bench('lodash/overEvery', () => {
    const overEvery = lodash.overEvery([Boolean, Number.isFinite]);
    do_not_optimize(overEvery('1'));
  });
});
