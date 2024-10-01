import { bench, describe } from 'vitest';
import { deburr as deburrToolkit_ } from 'es-toolkit';
import { deburr as deburrLodash_ } from 'lodash';

const deburrToolkit = deburrToolkit_;
const deburrLodash = deburrLodash_;

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
