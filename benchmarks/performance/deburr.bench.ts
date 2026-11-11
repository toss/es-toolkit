import { deburr as deburrToolkit } from 'es-toolkit';
import { deburr as deburrCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const longWord = 'déjà vu'.repeat(1000);
group('deburr', () => {
  bench('lodash/deburr', () => {
    do_not_optimize(lodash.deburr('déjà vu'));
  });

  bench('es-toolkit/compat/deburr', () => {
    do_not_optimize(deburrCompatToolkit('déjà vu'));
  });

  bench('es-toolkit/deburr', () => {
    do_not_optimize(deburrToolkit('déjà vu'));
  });

  bench('lodash/deburr - long words', () => {
    do_not_optimize(lodash.deburr(longWord));
  });

  bench('es-toolkit/compat/deburr - long words', () => {
    do_not_optimize(deburrCompatToolkit(longWord));
  });

  bench('es-toolkit/deburr - long words', () => {
    do_not_optimize(deburrToolkit(longWord));
  });
});
