import { upperFirst as upperFirstToolkit } from 'es-toolkit';
import { upperFirst as upperFirstCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('upperFirst', () => {
  group('short string', () => {
    bench('es-toolkit/upperFirst', () => {
      const str = 'camelCase';
      do_not_optimize(upperFirstToolkit(str));
    });

    bench('es-toolkit/compat/upperFirst', () => {
      const str = 'camelCase';
      do_not_optimize(upperFirstCompatToolkit(str));
    });

    bench('lodash/upperFirst', () => {
      const str = 'camelCase';
      do_not_optimize(lodash.upperFirst(str));
    });
  });

  group('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/upperFirst', () => {
      do_not_optimize(upperFirstToolkit(LONG_STR));
    });

    bench('es-toolkit/compat/upperFirst', () => {
      do_not_optimize(upperFirstCompatToolkit(LONG_STR));
    });

    bench('lodash/upperFirst', () => {
      do_not_optimize(lodash.upperFirst(LONG_STR));
    });
  });
});
