import { pullAllBy as pullAllByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }];

group('pullAllBy', () => {
  bench('es-toolkit/compat/pullAllBy', () => {
    pullAllByToolkitCompat(array, [{ x: 1 }, { x: 3 }], 'x');
  });

  bench('lodash/pullAllBy', () => {
    lodash.pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x');
  });
});
