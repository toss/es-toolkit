import { bench, describe } from 'vitest';
import { invert as invertByToolkit_ } from 'es-toolkit';
import { invert as invertByToolkitCompat_ } from 'es-toolkit/compat';
import { invert as invertByLodash_ } from 'lodash';

const invertByLodash = invertByLodash_;
const invertByToolkitCompat = invertByToolkitCompat_;
const invertByToolkit = invertByToolkit_;

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
