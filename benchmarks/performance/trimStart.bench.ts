import { bench, describe } from 'vitest';
import { trimStart as trimStartToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { trimStart: trimStartLodash } = lodash;

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
