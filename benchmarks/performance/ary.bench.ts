import { bench, describe } from 'vitest';
import { ary as aryToolkit } from 'es-toolkit/compat';
import { ary as aryLodash } from 'lodash';

describe('ary', () => {
  bench('es-toolkit/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    aryToolkit((_a, _b, _c) => undefined, 2);
  });

  bench('lodash/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    aryLodash((_a, _b, _c) => undefined, 2);
  });
});
