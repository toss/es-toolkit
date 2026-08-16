import { bench, describe } from 'vitest';
import { propertyOf as propertyOfToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { propertyOf: propertyOfLodash } = lodash;

describe('propertyOf', () => {
  bench('es-toolkit/propertyOf', () => {
    const getValue = propertyOfToolkit({ 'a.b': 1, a: { b: 1 } });
    getValue('a.b');
  });

  bench('lodash/propertyOf', () => {
    const getValue = propertyOfLodash({ 'a.b': 1, a: { b: 1 } });
    getValue('a.b');
  });
});
