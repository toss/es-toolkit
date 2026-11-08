import { partialRight as partialRightToolkit } from 'es-toolkit';
import { partialRight as partialRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const fn = function () {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
};

group('partial - without placeholder', () => {
  bench('es-toolkit/partialRight - without placeholder', () => {
    partialRightToolkit(fn, 'a');
  });

  bench('es-toolkit/compat/partialRight - without placeholder', () => {
    partialRightToolkitCompat(fn, 'a');
  });

  bench('lodash/partialRight - without placeholder', () => {
    lodash.partialRight(fn, 'a');
  });
});

group('partial - with placeholder', () => {
  bench('es-toolkit/partialRight - with placeholder', () => {
    const { placeholder } = partialRightToolkit;
    partialRightToolkit(fn, placeholder, 'b', placeholder);
  });

  bench('es-toolkit/compat/partialRight - with placeholder', () => {
    const { placeholder } = partialRightToolkitCompat;
    partialRightToolkitCompat(fn, placeholder, 'b', placeholder);
  });

  bench('lodash/partialRight - with placeholder', () => {
    const { placeholder } = lodash.partialRight;
    lodash.partialRight(fn, placeholder, 'b', placeholder);
  });
});
