import { bench, describe } from 'vitest';
import { rest as restToolkit } from 'es-toolkit';
import { rest as restLodash } from 'lodash';

describe('rest', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  bench('es-toolkit/rest', () => {
    restToolkit(fn);
  });

  bench('lodash/rest', () => {
    restLodash(fn);
  });
});
