import { bench, describe } from 'vitest';
import { padStart as padStartToolkit } from 'es-toolkit';
import { padStart as padStartLodash } from 'lodash';

describe('padStart', () => {
  bench('es-toolkit/padStart', () => {
    const str = 'abc';
    padStartToolkit(str, 6, '_-');
  });

  bench('lodash/padStart', () => {
    const str = 'abc';
    padStartLodash(str, 6, '_-');
  });
});
