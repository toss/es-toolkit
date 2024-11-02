import { bench, describe } from 'vitest';
import { trimStart as trimStartToolkit_ } from 'es-toolkit/compat';
import { trimStart as trimStartLodash_ } from 'lodash';

const trimStartToolkit = trimStartToolkit_;
const trimStartLodash = trimStartLodash_;

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
