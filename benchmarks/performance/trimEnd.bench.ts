import { bench, describe } from 'vitest';
import { trimEnd as trimEndToolkit_ } from 'es-toolkit/compat';
import { trimEnd as trimEndLodash_ } from 'lodash';

const trimEndToolkit = trimEndToolkit_;
const trimEndLodash = trimEndLodash_;

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
