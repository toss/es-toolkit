import { bench, describe } from 'vitest';
import { trimEnd as trimEndToolkit } from 'es-toolkit/compat';
import { trimEnd as trimEndLodash } from 'lodash';

describe('trimEnd', () => {
  bench('es-toolkit/trimEnd', () => {
    const str = 'kebab-case';
    trimEndToolkit(str, 'se');
  });

  bench('lodash/trimEnd', () => {
    const str = 'kebab-case';
    trimEndLodash(str);
  });
});
