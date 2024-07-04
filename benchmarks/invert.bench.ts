import { bench, describe } from 'vitest';
import { invert as invertByLodash } from 'lodash';
import { invert as invertByToolkit } from 'es-toolkit';

const object: { [key: string]: string } = {};
for (let i = 0; i < 10000; i++) {
  object[`key${i}`] = `value${i}`;
}

describe('invert function benchmark', () => {
  bench('es-toolkit/invert', () => {
    invertByToolkit(object);
  });

  bench('lodash/invert', () => {
    invertByLodash(object);
  });
});
