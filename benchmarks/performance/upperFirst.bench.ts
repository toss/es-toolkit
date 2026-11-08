import { upperFirst as upperFirstToolkit } from 'es-toolkit';
import { upperFirst as upperFirstCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('upperFirst', () => {
  group('short string', () => {
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
      lodash.upperFirst(str);
    });
  });

  group('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/upperFirst', () => {
      upperFirstToolkit(LONG_STR);
    });

    bench('es-toolkit/compat/upperFirst', () => {
      upperFirstCompatToolkit(LONG_STR);
    });

    bench('lodash/upperFirst', () => {
      lodash.upperFirst(LONG_STR);
    });
  });
});
