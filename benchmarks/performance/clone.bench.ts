import { bench, describe } from 'vitest';
import { clone as cloneToolkit_ } from 'es-toolkit';
import { clone as cloneToolkitCompat_ } from 'es-toolkit/compat';
import { clone as cloneLodash_ } from 'lodash';

const cloneToolkit = cloneToolkit_;
const cloneToolkitCompat = cloneToolkitCompat_;
const cloneLodash = cloneLodash_;

const obj = {
  number: 29,
  string: 'es-toolkit',
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1, b: 'es-toolkit' },
  date: new Date(),
  regex: /abc/g,
  nested: { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() },
};

describe('clone', () => {
  bench('es-toolkit/clone', () => {
    cloneToolkit(obj);
  });

  bench('es-toolkit/clone/compat', () => {
    cloneToolkitCompat(obj);
  });

  bench('lodash/clone', () => {
    cloneLodash(obj);
  });
});
