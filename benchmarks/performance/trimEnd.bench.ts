import { trimEnd as trimEndToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('trimEnd', () => {
  bench('es-toolkit/trimEnd', () => {
    const str = 'kebab-case';
    trimEndToolkit(str, 'se');
  });

  bench('lodash/trimEnd', () => {
    const str = 'kebab-case';
    lodash.trimEnd(str, 'se');
  });
});
