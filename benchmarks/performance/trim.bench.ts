import { trim as trimToolkit } from 'es-toolkit';
import { trim as trimCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('trim', () => {
  bench('es-toolkit/trim', () => {
    const str = 'kebab-case';
    trimToolkit(str, ['s', 'e']);
  });

  bench('es-toolkit/compat/trim', () => {
    const str = 'kebab-case';
    trimCompatToolkit(str, 'se');
  });

  bench('lodash/trim', () => {
    const str = 'kebab-case';
    lodash.trim(str, 'se');
  });
});
