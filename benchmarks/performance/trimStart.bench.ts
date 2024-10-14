import { trimStart as trimStartToolkit } from 'es-toolkit/compat';
import { trimStart as trimStartLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('trimStart', () => {
  bench('es-toolkit/trimStart', () => {
    const str = 'kebab-case';
    trimStartToolkit(str, 'se');
  });

  bench('lodash/trimStart', () => {
    const str = 'kebab-case';
    trimStartLodash(str, 'se');
  });
});
