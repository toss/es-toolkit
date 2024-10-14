import { trimEnd as trimEndToolkit } from 'es-toolkit/compat';
import { trimEnd as trimEndLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('trimEnd', () => {
  bench('es-toolkit/trimEnd', () => {
    const str = 'kebab-case';
    trimEndToolkit(str, 'se');
  });

  bench('lodash/trimEnd', () => {
    const str = 'kebab-case';
    trimEndLodash(str, 'se');
  });
});
