import { deburr as deburrToolkit } from 'es-toolkit';
import { deburr as deburrCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const longWord = 'déjà vu'.repeat(1000);
group('deburr', () => {
  bench('lodash/deburr', () => {
    lodash.deburr('déjà vu');
  });

  bench('es-toolkit/compat/deburr', () => {
    deburrCompatToolkit('déjà vu');
  });

  bench('es-toolkit/deburr', () => {
    deburrToolkit('déjà vu');
  });

  bench('lodash/deburr - long words', () => {
    lodash.deburr(longWord);
  });

  bench('es-toolkit/compat/deburr - long words', () => {
    deburrCompatToolkit(longWord);
  });

  bench('es-toolkit/deburr - long words', () => {
    deburrToolkit(longWord);
  });
});
