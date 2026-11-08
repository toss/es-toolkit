import { trimStart as trimStartToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('trimStart', () => {
  bench('es-toolkit/trimStart', () => {
    const str = 'kebab-case';
    trimStartToolkit(str, 'se');
  });

  bench('lodash/trimStart', () => {
    const str = 'kebab-case';
    lodash.trimStart(str, 'se');
  });
});
