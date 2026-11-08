import { pullAllBy as pullAllByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }];

group('pullAllBy', () => {
  bench('es-toolkit/compat/pullAllBy', () => {
    do_not_optimize(pullAllByToolkitCompat(array, [{ x: 1 }, { x: 3 }], 'x'));
  });

  bench('lodash/pullAllBy', () => {
    do_not_optimize(lodash.pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x'));
  });
});
