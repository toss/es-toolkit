import { bench, describe } from 'vitest';
import { trim as trimToolkit } from 'es-toolkit';
import { trim as trimLodash } from 'lodash';

describe('trim', () => {
  bench('es-toolkit/trim', () => {
    const str = 'kebab-case';
    trimToolkit(str, 'se');
  });

  bench('lodash/trim', () => {
    const str = 'kebab-case';
    trimLodash(str);
  });
});
