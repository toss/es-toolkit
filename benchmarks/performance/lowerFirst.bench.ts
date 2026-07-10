import { bench, describe } from 'vitest';
import { lowerFirst as lowerFirstToolkit } from 'es-toolkit';
import { lowerFirst as lowerFirstCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { lowerFirst: lowerFirstLodash } = lodash;

describe('lowerFirst', () => {
  describe('short string', () => {
    bench('es-toolkit/lowerFirst', () => {
      const str = 'camelCase';
      lowerFirstToolkit(str);
    });

    bench('es-toolkit/compat/lowerFirst', () => {
      const str = 'camelCase';
      lowerFirstCompatToolkit(str);
    });

    bench('lodash/lowerFirst', () => {
      const str = 'camelCase';
      lowerFirstLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/lowerFirst', () => {
      lowerFirstToolkit(LONG_STR);
    });

    bench('es-toolkit/compat/lowerFirst', () => {
      lowerFirstCompatToolkit(LONG_STR);
    });

    bench('lodash/lowerFirst', () => {
      lowerFirstLodash(LONG_STR);
    });
  });
});
