import { bench, describe } from 'vitest';
import { pad as padToolkit_ } from 'es-toolkit';
import { pad as padToolkitCompat_ } from 'es-toolkit/compat';
import { pad as padLodash_ } from 'lodash';

const padToolkit = padToolkit_;
const padToolkitCompat = padToolkitCompat_;
const padLodash = padLodash_;

describe('pad', () => {
  bench('es-toolkit/pad', () => {
    const str = 'abc';
    padToolkit(str, 6, '_-');
  });

  bench('es-toolkit/compat/pad', () => {
    const str = 'abc';
    padToolkitCompat(str, 6, '_-');
  });

  bench('lodash/pad', () => {
    const str = 'abc';
    padLodash(str, 6, '_-');
  });
});
