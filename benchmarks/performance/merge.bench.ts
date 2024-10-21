import { merge as mergeToolkit } from 'es-toolkit';
import { merge as mergeCompatToolkit } from 'es-toolkit/compat';
import { merge as mergeLodash } from 'lodash';
import { bench, describe } from '../bench';

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
