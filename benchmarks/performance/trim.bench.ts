import { bench, describe } from 'vitest';
import { trim as trimToolkit_ } from 'es-toolkit';
import { trim as trimCompatToolkit_ } from 'es-toolkit/compat';
import { trim as trimLodash_ } from 'lodash';

const trimToolkit = trimToolkit_;
const trimCompatToolkit = trimCompatToolkit_;
const trimLodash = trimLodash_;

describe('trim', () => {
  bench('es-toolkit/trim', () => {
    const str = 'kebab-case';
    trimToolkit(str, 'se');
  });

  bench('es-toolkit/compat/trim', () => {
    const str = 'kebab-case';
    trimCompatToolkit(str, 'se');
  });

  bench('lodash/trim', () => {
    const str = 'kebab-case';
    trimLodash(str, 'se');
  });
});
