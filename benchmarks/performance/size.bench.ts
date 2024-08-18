import { bench, describe } from 'vitest';
import { size as sizeToolkit } from 'es-toolkit';
import { size as sizeLodash } from 'lodash';

describe('size', () => {
  bench('es-toolkit/size', () => {
    sizeToolkit([1, 2, 3, 4]);
    sizeToolkit('hello');
    sizeToolkit({ a: 1, b: 2, c: 3 });
    sizeToolkit([]);
    sizeToolkit('');
    sizeToolkit({});
    sizeToolkit(new Set([1, 2, 3]));
    sizeToolkit(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    );
  });

  bench('lodash/size', () => {
    sizeLodash([1, 2, 3, 4]);
    sizeLodash('hello');
    sizeLodash({ a: 1, b: 2, c: 3 });
    sizeLodash([]);
    sizeLodash('');
    sizeLodash({});
    sizeLodash(new Set([1, 2, 3]));
    sizeLodash(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    );
  });
});
