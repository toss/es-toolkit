import { bench, describe } from 'vitest';
import { overArgs as overArgsCompat_ } from 'es-toolkit/compat';
import { overArgs as overArgsLodash_ } from 'lodash';

const overArgsTookitCompat = overArgsCompat_;
const overArgsLodash = overArgsLodash_;

describe('overArgs', () => {
  const doubled = (n: number) => n * 2;
  const square = (n: number) => n * n;
  const targetFunc = (x: number, y: number) => [x, y];

  bench('es-toolkit/compat/overArgs', () => {
    const func = overArgsTookitCompat(targetFunc, doubled, square);
    func(4, 2);
  });

  bench('lodash/overArgs', () => {
    const func = overArgsLodash(targetFunc, doubled, square);
    func(4, 2);
  });
});
