import { bench, describe } from 'vitest';
import { padStart as padStartToolkit_ } from 'es-toolkit/compat';
import { padStart as padStartLodash_ } from 'lodash';

const padStartToolkit = padStartToolkit_;
const padStartLodash = padStartLodash_;

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
