import { bench, describe } from 'vitest';
import { ary as aryToolkit } from 'es-toolkit';
import { ary as aryCompactToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { ary: aryLodash } = lodash;

describe('ary', () => {
  bench('es-toolkit/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    aryToolkit((_a, _b, _c) => undefined, 2);
  });

  bench('es-toolkit/compat/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    aryCompactToolkit((_a, _b, _c) => undefined, 2);
  });

  bench('lodash/ary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    aryLodash((_a, _b, _c) => undefined, 2);
  });
});
