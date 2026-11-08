import { invert as invertByToolkit } from 'es-toolkit';
import { invert as invertByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object: { [key: string]: string } = {};
for (let i = 0; i < 10000; i++) {
  object[`key${i}`] = `value${i}`;
}

group('invert function benchmark', () => {
  bench('es-toolkit/invert', () => {
    invertByToolkit(object);
  });

  bench('es-toolkit/compat/invert', () => {
    invertByToolkitCompat(object);
  });

  bench('lodash/invert', () => {
    lodash.invert(object);
  });
});
