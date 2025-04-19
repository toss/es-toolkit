import { bench, describe } from 'vitest';
import { partialRight as partialRightToolkit_ } from 'es-toolkit';
import { partialRight as partialRightToolkitCompat_ } from 'es-toolkit/compat';
import { partialRight as partialRightLodash_ } from 'lodash';

const partialRightToolkit = partialRightToolkit_;
const partialRightToolkitCompat = partialRightToolkitCompat_;
const partialRightLodash = partialRightLodash_;

const fn = function () {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
};

describe('partial - without placeholder', () => {
  bench('es-toolkit/partialRight - without placeholder', () => {
    partialRightToolkit(fn, 'a');
  });

  bench('es-toolkit/compat/partialRight - without placeholder', () => {
    partialRightToolkitCompat(fn, 'a');
  });

  bench('lodash/partialRight - without placeholder', () => {
    partialRightLodash(fn, 'a');
  });
});

describe('partial - with placeholder', () => {
  bench('es-toolkit/partialRight - with placeholder', () => {
    const { placeholder } = partialRightToolkit;
    partialRightToolkit(fn, placeholder, 'b', placeholder);
  });

  bench('es-toolkit/compat/partialRight - with placeholder', () => {
    const { placeholder } = partialRightToolkitCompat;
    partialRightToolkitCompat(fn, placeholder, 'b', placeholder);
  });

  bench('lodash/partialRight - with placeholder', () => {
    const { placeholder } = partialRightLodash;
    partialRightLodash(fn, placeholder, 'b', placeholder);
  });
});
