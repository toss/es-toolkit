import { bench, describe } from 'vitest';
import { isEmpty as isEmptyToolkit } from 'es-toolkit';
import { isEmpty as isEmptyLodash } from 'lodash';

const falsyList = [null, undefined, false, 0, NaN, ''];

describe('isEmpty', () => {
  bench('es-toolkit', () => {
    falsyList.forEach(falsy => isEmptyToolkit(falsy));
    isEmptyToolkit([]);
    isEmptyToolkit({});
  });

  bench('lodash', () => {
    falsyList.forEach(falsy => isEmptyLodash(falsy));
    isEmptyLodash([]);
    isEmptyLodash({});
  });
});
