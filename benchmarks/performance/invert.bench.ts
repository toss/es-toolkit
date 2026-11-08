import { invert as invertByToolkit } from 'es-toolkit';
import { invert as invertByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object: { [key: string]: string } = {};
for (let i = 0; i < 10000; i++) {
  object[`key${i}`] = `value${i}`;
}

group('invert function benchmark', () => {
  bench('es-toolkit/invert', () => {
    do_not_optimize(invertByToolkit(object));
  });

  bench('es-toolkit/compat/invert', () => {
    do_not_optimize(invertByToolkitCompat(object));
  });

  bench('lodash/invert', () => {
    do_not_optimize(lodash.invert(object));
  });
});
