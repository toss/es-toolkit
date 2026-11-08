import { ary as aryToolkit } from 'es-toolkit';
import { ary as aryCompactToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('ary', () => {
  bench('es-toolkit/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    do_not_optimize(aryToolkit((_a, _b, _c) => undefined, 2));
  });

  bench('es-toolkit/compat/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    do_not_optimize(aryCompactToolkit((_a, _b, _c) => undefined, 2));
  });

  bench('lodash/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    do_not_optimize(lodash.ary((_a, _b, _c) => undefined, 2));
  });
});
