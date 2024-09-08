import { bench, describe } from 'vitest';
import { pad as padStartToolkit } from 'es-toolkit';
import { pad as padStartLodash } from 'lodash';

describe('pad', () => {
  bench('es-toolkit/pad', () => {
    const str = 'abc';
    padStartToolkit(str, 6, '_-');
  });

  bench('lodash/pad', () => {
    const str = 'abc';
    padStartLodash(str, 6, '_-');
  });
});
