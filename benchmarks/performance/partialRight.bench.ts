import { partialRight as partialRightToolkit } from 'es-toolkit';
import { partialRight as partialRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const fn = function () {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
};

group('partial - without placeholder', () => {
  bench('es-toolkit/partialRight - without placeholder', () => {
    do_not_optimize(partialRightToolkit(fn, 'a'));
  });

  bench('es-toolkit/compat/partialRight - without placeholder', () => {
    do_not_optimize(partialRightToolkitCompat(fn, 'a'));
  });

  bench('lodash/partialRight - without placeholder', () => {
    do_not_optimize(lodash.partialRight(fn, 'a'));
  });
});

group('partial - with placeholder', () => {
  bench('es-toolkit/partialRight - with placeholder', () => {
    const { placeholder } = partialRightToolkit;
    do_not_optimize(partialRightToolkit(fn, placeholder, 'b', placeholder));
  });

  bench('es-toolkit/compat/partialRight - with placeholder', () => {
    const { placeholder } = partialRightToolkitCompat;
    do_not_optimize(partialRightToolkitCompat(fn, placeholder, 'b', placeholder));
  });

  bench('lodash/partialRight - with placeholder', () => {
    const { placeholder } = lodash.partialRight;
    do_not_optimize(lodash.partialRight(fn, placeholder, 'b', placeholder));
  });
});
