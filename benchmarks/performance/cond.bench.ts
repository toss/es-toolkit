import { bench, describe } from 'vitest';
import { cond as condToolkitCompat_ } from 'es-toolkit/compat';
import { cond as condLodash_ } from 'lodash';

const condToolkitCompat = condToolkitCompat_;
const condLodash = condLodash_;

describe('cond', () => {
  const isA = obj => obj && obj.a === 1;
  const isB = obj => obj && obj.b === 1;
  const isC = obj => obj && obj.c;

  const returnA = () => 'a';
  const returnB = () => 'b';
  const returnC = () => 'c';

  const pairs = [
    [isA, returnA],
    [isB, returnB],
    [isC, returnC],
  ];

  const objA = { a: 1, b: 0, c: 0 };
  const objB = { a: 0, b: 1, c: 0 };
  const objC = { a: 0, b: 0, c: 1 };
  const objNone = { a: 0, b: 0, c: 0 };

  const funcToolkit = condToolkitCompat(pairs as any) as (obj: any) => string;
  const funcLodash = condLodash(pairs as any) as (obj: any) => string;

  bench(
    'es-toolkit/compat/cond',
    () => {
      funcToolkit(objA);
      funcToolkit(objB);
      funcToolkit(objC);
      funcToolkit(objNone);
    },
    {
      time: 100,
    }
  );

  bench(
    'lodash/cond',
    () => {
      funcLodash(objA);
      funcLodash(objB);
      funcLodash(objC);
      funcLodash(objNone);
    },
    {
      time: 100,
    }
  );
});
