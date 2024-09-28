import { bench, describe } from 'vitest';
import { rearg as reargToolkit } from 'es-toolkit/compat';
import { rearg as reargLodash } from 'lodash';

describe('rearg', () => {
  function fn() {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  bench('es-toolkit/rearg', () => {
    reargToolkit(fn, [2, 0, 1]);
  });

  bench('lodash/rearg', () => {
    reargLodash(fn, [2, 0, 1]);
  });
});
