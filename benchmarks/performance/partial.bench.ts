import { bench, describe } from 'vitest';
import { partial as partialToolkit_ } from 'es-toolkit';
import { partial as partialLodash_ } from 'lodash';

const partialToolkit = partialToolkit_;
const partialLodash = partialLodash_;

const fn = function () {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
};

describe('partial - without placeholder', () => {
  bench('es-toolkit/partial - without placeholder', () => {
    partialToolkit(fn, 'a');
  });

  bench('lodash/partial - without placeholder', () => {
    partialLodash(fn, 'a');
  });
});

describe('partial - with placeholder', () => {
  bench('es-toolkit/partial - with placeholder', () => {
    const { placeholder } = partialToolkit;
    partialToolkit(fn, placeholder, 'b', placeholder);
  });

  bench('lodash/partial - with placeholder', () => {
    const { placeholder } = partialLodash;
    partialLodash(fn, placeholder, 'b', placeholder);
  });
});
