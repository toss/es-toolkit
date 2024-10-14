import { invert as invertByToolkit } from 'es-toolkit';
import { invert as invertByLodash } from 'lodash';
import { bench, describe } from '../bench';

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
