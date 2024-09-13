import { bench, describe } from 'vitest';
import { unary as unaryToolkit } from 'es-toolkit';
import { unary as unaryLodash } from 'lodash';

describe('ary', () => {
  bench('es-toolkit/unary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unaryToolkit((_a, _b, _c) => undefined);
  });

  bench('lodash/unary', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unaryLodash((_a, _b, _c) => undefined);
  });
});
