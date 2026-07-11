import { bench, describe } from 'vitest';
import { deburr as deburrToolkit } from 'es-toolkit';
import { deburr as deburrCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { deburr: deburrLodash } = lodash;

const longWord = 'déjà vu'.repeat(1000);
describe('deburr', () => {
  bench('lodash/deburr', () => {
    deburrLodash('déjà vu');
  });

  bench('es-toolkit/compat/deburr', () => {
    deburrCompatToolkit('déjà vu');
  });

  bench('es-toolkit/deburr', () => {
    deburrToolkit('déjà vu');
  });

  bench('lodash/deburr - long words', () => {
    deburrLodash(longWord);
  });

  bench('es-toolkit/compat/deburr - long words', () => {
    deburrCompatToolkit(longWord);
  });

  bench('es-toolkit/deburr - long words', () => {
    deburrToolkit(longWord);
  });
});
