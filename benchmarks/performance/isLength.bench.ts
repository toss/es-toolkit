import { isLength as isLengthToolkit } from 'es-toolkit';
import { isLength as isLengthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isLength', () => {
  bench('es-toolkit/isLength', () => {
    isLengthToolkit(100);
    isLengthToolkit(0);
    isLengthToolkit(-1);
    isLengthToolkit(1.5);
    isLengthToolkit(Number.MAX_SAFE_INTEGER);
    isLengthToolkit(Number.MAX_SAFE_INTEGER + 1);
    isLengthToolkit('100');
    isLengthToolkit(true);
    isLengthToolkit(null);
    isLengthToolkit(undefined);
    isLengthToolkit({});
    isLengthToolkit([]);
  });

  bench('es-toolkit/compat/isLength', () => {
    isLengthToolkitCompat(100);
    isLengthToolkitCompat(0);
    isLengthToolkitCompat(-1);
    isLengthToolkitCompat(1.5);
    isLengthToolkitCompat(Number.MAX_SAFE_INTEGER);
    isLengthToolkitCompat(Number.MAX_SAFE_INTEGER + 1);
    isLengthToolkitCompat('100');
    isLengthToolkitCompat(true);
    isLengthToolkitCompat(null);
    isLengthToolkitCompat(undefined);
    isLengthToolkitCompat({});
    isLengthToolkitCompat([]);
  });

  bench('lodash/isLength', () => {
    lodash.isLength(100);
    lodash.isLength(0);
    lodash.isLength(-1);
    lodash.isLength(1.5);
    lodash.isLength(Number.MAX_SAFE_INTEGER);
    lodash.isLength(Number.MAX_SAFE_INTEGER + 1);
    lodash.isLength('100');
    lodash.isLength(true);
    lodash.isLength(null);
    lodash.isLength(undefined);
    lodash.isLength({});
    lodash.isLength([]);
  });
});
