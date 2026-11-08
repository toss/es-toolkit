import { propertyOf as propertyOfToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('propertyOf', () => {
  bench('es-toolkit/propertyOf', () => {
    const getValue = propertyOfToolkit({ 'a.b': 1, a: { b: 1 } });
    getValue('a.b');
  });

  bench('lodash/propertyOf', () => {
    const getValue = lodash.propertyOf({ 'a.b': 1, a: { b: 1 } });
    getValue('a.b');
  });
});
