import { padStart as padStartToolkit } from 'es-toolkit/compat';
import { padStart as padStartLodash } from 'lodash';
import { bench, describe } from '../bench';

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
