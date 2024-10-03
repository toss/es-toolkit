import { bench, describe } from 'vitest';
import { padEnd as padEndToolkit_ } from 'es-toolkit/compat';
import { padEnd as padEndLodash_ } from 'lodash';

const padEndToolkit = padEndToolkit_;
const padEndLodash = padEndLodash_;

describe('padEnd', () => {
  bench('es-toolkit/padEnd', () => {
    const str = 'abc';
    padEndToolkit(str, 6, '_-');
  });

  bench('lodash/padEnd', () => {
    const str = 'abc';
    padEndLodash(str, 6, '_-');
  });
});
