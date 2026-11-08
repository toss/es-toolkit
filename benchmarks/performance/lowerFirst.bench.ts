import { lowerFirst as lowerFirstToolkit } from 'es-toolkit';
import { lowerFirst as lowerFirstCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('lowerFirst', () => {
  group('short string', () => {
    bench('es-toolkit/lowerFirst', () => {
      const str = 'camelCase';
      do_not_optimize(lowerFirstToolkit(str));
    });

    bench('es-toolkit/compat/lowerFirst', () => {
      const str = 'camelCase';
      do_not_optimize(lowerFirstCompatToolkit(str));
    });

    bench('lodash/lowerFirst', () => {
      const str = 'camelCase';
      do_not_optimize(lodash.lowerFirst(str));
    });
  });

  group('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/lowerFirst', () => {
      do_not_optimize(lowerFirstToolkit(LONG_STR));
    });

    bench('es-toolkit/compat/lowerFirst', () => {
      do_not_optimize(lowerFirstCompatToolkit(LONG_STR));
    });

    bench('lodash/lowerFirst', () => {
      do_not_optimize(lodash.lowerFirst(LONG_STR));
    });
  });
});
