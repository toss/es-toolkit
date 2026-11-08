import { unary as unaryToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('ary', () => {
  bench('es-toolkit/unary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unaryToolkit((_a, _b, _c) => undefined);
  });

  bench('lodash/unary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lodash.unary((_a, _b, _c) => undefined);
  });
});
