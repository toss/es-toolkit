import { bench, describe } from 'vitest';
import { padEnd as padEndToolkit } from 'es-toolkit/compat';
import { padEnd as padEndLodash } from 'lodash';

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
