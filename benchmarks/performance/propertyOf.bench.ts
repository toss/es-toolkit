import { propertyOf as propertyOfToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('propertyOf', () => {
  bench('es-toolkit/propertyOf', () => {
    const getValue = propertyOfToolkit({ 'a.b': 1, a: { b: 1 } });
    do_not_optimize(getValue('a.b'));
  });

  bench('lodash/propertyOf', () => {
    const getValue = lodash.propertyOf({ 'a.b': 1, a: { b: 1 } });
    do_not_optimize(getValue('a.b'));
  });
});
