import { upperCase as upperCaseToolkit } from 'es-toolkit';
import { upperCase as upperCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('upperCase', () => {
  group('short string', () => {
    bench('es-toolkit/upperCase', () => {
      const str = 'camelCase';
      do_not_optimize(upperCaseToolkit(str));
    });

    bench('es-toolkit/compat/upperCase', () => {
      const str = 'camelCase';
      do_not_optimize(upperCaseToolkitCompat(str));
    });

    bench('lodash/upperCase', () => {
      const str = 'camelCase';
      do_not_optimize(lodash.upperCase(str));
    });
  });

  group('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/upperCase', () => {
      do_not_optimize(upperCaseToolkit(LONG_STR));
    });

    bench('es-toolkit/compat/upperCase', () => {
      do_not_optimize(upperCaseToolkitCompat(LONG_STR));
    });

    bench('lodash/upperCase', () => {
      do_not_optimize(lodash.upperCase(LONG_STR));
    });
  });
});
