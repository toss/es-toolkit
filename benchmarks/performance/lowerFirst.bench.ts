import { lowerFirst as lowerFirstToolkit } from 'es-toolkit';
import { lowerFirst as lowerFirstCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('lowerFirst', () => {
  group('short string', () => {
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
      lodash.lowerFirst(str);
    });
  });

  group('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/lowerFirst', () => {
      lowerFirstToolkit(LONG_STR);
    });

    bench('es-toolkit/compat/lowerFirst', () => {
      lowerFirstCompatToolkit(LONG_STR);
    });

    bench('lodash/lowerFirst', () => {
      lodash.lowerFirst(LONG_STR);
    });
  });
});
