import { bench, describe } from 'vitest';
import { delay as delayToolkitCompat_ } from 'es-toolkit/compat';
import { delay as delayLodash_ } from 'lodash';

const delayToolkitCompat = delayToolkitCompat_;
const delayLodash = delayLodash_;

describe('delay', () => {
  bench('es-toolkit/compat/delay', () => {
    delayToolkitCompat(() => {
      console.info('hello');
    }, 1000);
  });

  bench('lodash/delay', () => {
    delayLodash(() => {
      console.info('hello');
    }, 1000);
  });
});
