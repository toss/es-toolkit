import { bench, describe } from 'vitest';
import { partial as partialToolkit } from 'es-toolkit';
import { partial as partialToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { partial: partialLodash } = lodash;

const fn = function () {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
};

describe('partial - without placeholder', () => {
  bench('es-toolkit/partial - without placeholder', () => {
    partialToolkit(fn, 'a');
  });

  bench('es-toolkit/compat/partial - without placeholder', () => {
    partialToolkitCompat(fn, 'a');
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

  bench('es-toolkit/compat/partial - with placeholder', () => {
    const { placeholder } = partialToolkitCompat;
    partialToolkitCompat(fn, placeholder, 'b', placeholder);
  });

  bench('lodash/partial - with placeholder', () => {
    const { placeholder } = partialLodash;
    partialLodash(fn, placeholder, 'b', placeholder);
  });
});
