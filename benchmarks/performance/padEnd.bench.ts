import { bench, describe } from 'vitest';
import { padEnd as padStartToolkit } from 'es-toolkit/compat';
import { padEnd as padStartLodash } from 'lodash';

describe('padEnd', () => {
  bench('es-toolkit/padEnd', () => {
    const str = 'abc';
    padStartToolkit(str, 6, '_-');
  });

  bench('lodash/padEnd', () => {
    const str = 'abc';
    padStartLodash(str, 6, '_-');
  });
});
