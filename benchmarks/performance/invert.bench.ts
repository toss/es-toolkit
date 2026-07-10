import { bench, describe } from 'vitest';
import { invert as invertByToolkit } from 'es-toolkit';
import { invert as invertByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { invert: invertByLodash } = lodash;

const object: { [key: string]: string } = {};
for (let i = 0; i < 10000; i++) {
  object[`key${i}`] = `value${i}`;
}

describe('invert function benchmark', () => {
  bench('es-toolkit/invert', () => {
    invertByToolkit(object);
  });

  bench('es-toolkit/compat/invert', () => {
    invertByToolkitCompat(object);
  });

  bench('lodash/invert', () => {
    invertByLodash(object);
  });
});
