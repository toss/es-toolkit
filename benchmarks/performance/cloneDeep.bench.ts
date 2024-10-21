import { cloneDeep as cloneDeepToolkit } from 'es-toolkit';
import { cloneDeep as cloneDeepCompatToolkit } from 'es-toolkit/compat';
import { cloneDeep as cloneDeepLodash } from 'lodash';
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
  nested2: { a: { b: { c: { d: { e: { f: { g: 'es-toolkit' } } } } } } },
};

describe('cloneDeep', () => {
  bench('es-toolkit/cloneDeep', () => {
    cloneDeepToolkit(obj);
  });

  bench('es-toolkit/compat/cloneDeep', () => {
    cloneDeepCompatToolkit(obj);
  });

  bench('lodash/cloneDeep', () => {
    cloneDeepLodash(obj);
  });

  bench('node/JSON.parse', () => {
    JSON.parse(JSON.stringify(obj));
  });

  bench('node/structuredClone', () => {
    structuredClone(obj);
  });
});
