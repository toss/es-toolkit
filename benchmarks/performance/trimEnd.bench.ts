import { trimEnd as trimEndToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('trimEnd', () => {
  bench('es-toolkit/trimEnd', () => {
    const str = 'kebab-case';
    do_not_optimize(trimEndToolkit(str, 'se'));
  });

  bench('lodash/trimEnd', () => {
    const str = 'kebab-case';
    do_not_optimize(lodash.trimEnd(str, 'se'));
  });
});
