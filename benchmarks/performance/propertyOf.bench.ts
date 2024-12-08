import { bench, describe } from 'vitest';
import { propertyOf as propertyOfToolkit_ } from 'es-toolkit/compat';
import { propertyOf as propertyOfLodash_ } from 'lodash';

const propertyOfToolkit = propertyOfToolkit_;
const propertyOfLodash = propertyOfLodash_;

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
