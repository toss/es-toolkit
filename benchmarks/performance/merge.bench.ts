import { merge as mergeToolkit } from 'es-toolkit';
import { merge as mergeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const object = {
  a: [{ b: 2 }, { d: 4 }],
};

const other = {
  a: [{ c: 3 }, { e: 5 }],
};

group('merge', () => {
  bench('lodash/merge', () => {
    do_not_optimize(lodash.merge(object, other));
  });

  bench('es-toolkit/merge', () => {
    do_not_optimize(mergeToolkit(object, other));
  });

  bench('es-toolkit/compat/merge', () => {
    do_not_optimize(mergeCompatToolkit(object, other));
  });
});
