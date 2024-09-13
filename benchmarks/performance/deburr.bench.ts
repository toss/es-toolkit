import { bench, describe } from 'vitest';
import { deburr as deburrToolkit } from 'es-toolkit';
import { deburr as deburrLodash } from 'lodash';

const longWord = 'déjà vu'.repeat(1000);
describe('deburr', () => {
  bench('lodash/deburr', () => {
    deburrLodash('déjà vu');
  });

  bench('es-toolkit/deburr', () => {
    deburrToolkit('déjà vu');
  });

  bench('lodash/deburr - long words', () => {
    deburrLodash(longWord);
  });

  bench('es-toolkit/deburr - long words', () => {
    deburrToolkit(longWord);
  });
});
