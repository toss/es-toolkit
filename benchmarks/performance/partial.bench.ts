import { partial as partialToolkit } from 'es-toolkit';
import { partial as partialToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const fn = function () {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments);
};

group('partial - without placeholder', () => {
  bench('es-toolkit/partial - without placeholder', () => {
    do_not_optimize(partialToolkit(fn, 'a'));
  });

  bench('es-toolkit/compat/partial - without placeholder', () => {
    do_not_optimize(partialToolkitCompat(fn, 'a'));
  });

  bench('lodash/partial - without placeholder', () => {
    do_not_optimize(lodash.partial(fn, 'a'));
  });
});

group('partial - with placeholder', () => {
  bench('es-toolkit/partial - with placeholder', () => {
    const { placeholder } = partialToolkit;
    do_not_optimize(partialToolkit(fn, placeholder, 'b', placeholder));
  });

  bench('es-toolkit/compat/partial - with placeholder', () => {
    const { placeholder } = partialToolkitCompat;
    do_not_optimize(partialToolkitCompat(fn, placeholder, 'b', placeholder));
  });

  bench('lodash/partial - with placeholder', () => {
    const { placeholder } = lodash.partial;
    do_not_optimize(lodash.partial(fn, placeholder, 'b', placeholder));
  });
});
