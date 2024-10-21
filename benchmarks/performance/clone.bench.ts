import { clone as cloneToolkit } from 'es-toolkit';
import { clone as cloneLodash } from 'lodash';
import { bench, describe } from '../bench';

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
  bench('lodash/clone', () => {
    cloneLodash(obj);
  });
});
