import { bench, describe } from 'vitest';
import { partialRight as partialRightToolkit } from 'es-toolkit';
import { partialRight as partialRightLodash } from 'lodash';

const fn = function () {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
};

describe('partial', () => {
  bench('es-toolkit/partialRight - without placeholder', () => {
    partialRightToolkit(fn, 'a');
  });

  bench('lodash/partialRight - without placeholder', () => {
    partialRightLodash(fn, 'a');
  });
  bench('es-toolkit/partialRight - with placeholder', () => {
    const { placeholder } = partialRightToolkit;
    partialRightToolkit(fn, placeholder, 'b', placeholder);
  });

  bench('lodash/partialRight - with placeholder', () => {
    const { placeholder } = partialRightLodash;
    partialRightLodash(fn, placeholder, 'b', placeholder);
  });
});
