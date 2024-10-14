import { ary as aryToolkit } from 'es-toolkit/compat';
import { ary as aryLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('ary', () => {
  bench('es-toolkit/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ary = aryToolkit((_a, _b, _c) => undefined, 2);
    ary(1, 2, 3);
  });

  bench('lodash/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ary = aryLodash((_a, _b, _c) => undefined, 2);
    ary(1, 2, 3);
  });
});
