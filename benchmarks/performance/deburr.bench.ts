import { bench, describe } from 'vitest';
import { deburr as deburrToolkit_ } from 'es-toolkit';
import { deburr as deburrCompatToolkit_ } from 'es-toolkit/compat';
import { deburr as deburrLodash_ } from 'lodash';

const deburrToolkit = deburrToolkit_;
const deburrCompatToolkit = deburrCompatToolkit_;
const deburrLodash = deburrLodash_;

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
