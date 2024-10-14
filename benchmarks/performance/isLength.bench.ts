import { isLength as isLengthToolkit } from 'es-toolkit';
import { isLength as isLengthLodash } from 'lodash';
import { bench, describe } from '../bench';

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
