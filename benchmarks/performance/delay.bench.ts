import { bench, describe } from 'vitest';
import { delay as delayToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { delay: delayLodash } = lodash;

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
