import { trimStart as trimStartToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('trimStart', () => {
  bench('es-toolkit/trimStart', () => {
    const str = 'kebab-case';
    do_not_optimize(trimStartToolkit(str, 'se'));
  });

  bench('lodash/trimStart', () => {
    const str = 'kebab-case';
    do_not_optimize(lodash.trimStart(str, 'se'));
  });
});
