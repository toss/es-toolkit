import { trim as trimToolkit } from 'es-toolkit';
import { trim as trimCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('trim', () => {
  bench('es-toolkit/trim', () => {
    const str = 'kebab-case';
    do_not_optimize(trimToolkit(str, ['s', 'e']));
  });

  bench('es-toolkit/compat/trim', () => {
    const str = 'kebab-case';
    do_not_optimize(trimCompatToolkit(str, 'se'));
  });

  bench('lodash/trim', () => {
    const str = 'kebab-case';
    do_not_optimize(lodash.trim(str, 'se'));
  });
});
