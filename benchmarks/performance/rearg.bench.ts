import { bench, describe } from 'vitest';
import { rearg as reargToolkit_ } from 'es-toolkit/compat';
import { rearg as reargLodash_ } from 'lodash';

const reargToolkit = reargToolkit_;
const reargLodash = reargLodash_;

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
