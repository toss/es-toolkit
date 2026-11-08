import { merge as mergeToolkit } from 'es-toolkit';
import { merge as mergeCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = {
  a: [{ b: 2 }, { d: 4 }],
};

const other = {
  a: [{ c: 3 }, { e: 5 }],
};

group('merge', () => {
  bench('lodash/merge', () => {
    lodash.merge(object, other);
  });

  bench('es-toolkit/merge', () => {
    mergeToolkit(object, other);
  });

  bench('es-toolkit/compat/merge', () => {
    mergeCompatToolkit(object, other);
  });
});
