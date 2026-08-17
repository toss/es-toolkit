import { bench, describe } from 'vitest';
import { upperFirst as upperFirstToolkit } from 'es-toolkit';
import { upperFirst as upperFirstCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { upperFirst: upperFirstLodash } = lodash;

describe('upperFirst', () => {
  describe('short string', () => {
    bench('es-toolkit/upperFirst', () => {
      const str = 'camelCase';
      upperFirstToolkit(str);
    });

    bench('es-toolkit/compat/upperFirst', () => {
      const str = 'camelCase';
      upperFirstCompatToolkit(str);
    });

    bench('lodash/upperFirst', () => {
      const str = 'camelCase';
      upperFirstLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/upperFirst', () => {
      upperFirstToolkit(LONG_STR);
    });

    bench('es-toolkit/compat/upperFirst', () => {
      upperFirstCompatToolkit(LONG_STR);
    });

    bench('lodash/upperFirst', () => {
      upperFirstLodash(LONG_STR);
    });
  });
});
