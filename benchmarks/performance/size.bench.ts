import { bench, describe } from 'vitest';
import { size as sizeToolkit_ } from 'es-toolkit/compat';
import { size as sizeLodash_ } from 'lodash';

const sizeToolkit = sizeToolkit_;
const sizeLodash = sizeLodash_;

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
