import { bench, describe } from 'vitest';
import { isLength as isLengthToolkit_ } from 'es-toolkit';
import { isLength as isLengthToolkitCompat_ } from 'es-toolkit/compat';
import { isLength as isLengthLodash_ } from 'lodash';

const isLengthToolkit = isLengthToolkit_;
const isLengthToolkitCompat = isLengthToolkitCompat_;
const isLengthLodash = isLengthLodash_;

describe('isLength', () => {
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
    isLengthLodash(100);
    isLengthLodash(0);
    isLengthLodash(-1);
    isLengthLodash(1.5);
    isLengthLodash(Number.MAX_SAFE_INTEGER);
    isLengthLodash(Number.MAX_SAFE_INTEGER + 1);
    isLengthLodash('100');
    isLengthLodash(true);
    isLengthLodash(null);
    isLengthLodash(undefined);
    isLengthLodash({});
    isLengthLodash([]);
  });
});
