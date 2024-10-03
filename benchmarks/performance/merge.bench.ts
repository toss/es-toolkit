import { bench, describe } from 'vitest';
import { merge as mergeToolkit_ } from 'es-toolkit';
import { merge as mergeCompatToolkit_ } from 'es-toolkit/compat';
import { merge as mergeLodash_ } from 'lodash';

const mergeToolkit = mergeToolkit_;
const mergeCompatToolkit = mergeCompatToolkit_;
const mergeLodash = mergeLodash_;

const object = {
  a: [{ b: 2 }, { d: 4 }],
};

const other = {
  a: [{ c: 3 }, { e: 5 }],
};

describe('merge', () => {
  bench('lodash/merge', () => {
    mergeLodash(object, other);
  });

  bench('es-toolkit/merge', () => {
    mergeToolkit(object, other);
  });

  bench('es-toolkit/compat/merge', () => {
    mergeCompatToolkit(object, other);
  });
});
