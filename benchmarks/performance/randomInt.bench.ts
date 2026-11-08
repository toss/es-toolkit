import { randomInt as randomIntToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('randomInt', () => {
  bench('es-toolkit/randomInt', () => {
    randomIntToolkit(1, 10);
  });

  bench('lodash/randomInt', () => {
    lodash.random(1, 10, false);
  });
});
