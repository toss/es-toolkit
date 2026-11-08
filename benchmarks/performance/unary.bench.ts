import { unary as unaryToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('ary', () => {
  bench('es-toolkit/unary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    do_not_optimize(unaryToolkit((_a, _b, _c) => undefined));
  });

  bench('lodash/unary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    do_not_optimize(lodash.unary((_a, _b, _c) => undefined));
  });
});
