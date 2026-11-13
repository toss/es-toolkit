import { cloneDeep as cloneDeepToolkit } from 'es-toolkit';
import { cloneDeep as cloneDeepCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import createRfdc from 'rfdc';
import { bench, do_not_optimize, group } from './harness.ts';

const rfdcWithCircle = createRfdc({
  circles: true,
});
const rfdc = createRfdc();

const obj = {
  number: 29,
  string: 'es-toolkit',
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1, b: 'es-toolkit' },
  date: new Date(),
  regex: /abc/g,
  instance: new (class Test {
    value = 1;
  })(),
  nested: { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() },
  nested2: { a: { b: { c: { d: { e: { f: { g: 'es-toolkit' } } } } } } },
};

group('cloneDeep', () => {
  bench('es-toolkit/cloneDeep', () => {
    do_not_optimize(cloneDeepToolkit(obj));
  });

  bench('es-toolkit/compat/cloneDeep', () => {
    do_not_optimize(cloneDeepCompatToolkit(obj));
  });

  bench('lodash/cloneDeep', () => {
    do_not_optimize(lodash.cloneDeep(obj));
  });

  bench('node/JSON.parse', () => {
    do_not_optimize(JSON.parse(JSON.stringify(obj)));
  });

  bench('node/structuredClone', () => {
    do_not_optimize(structuredClone(obj));
  });

  bench('rfdc without circle', () => {
    do_not_optimize(rfdc(obj));
  });

  bench('rfdc with circle', () => {
    do_not_optimize(rfdcWithCircle(obj));
  });
});
