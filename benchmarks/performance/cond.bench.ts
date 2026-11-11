import { cond as condToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('cond', () => {
  const isA = (obj: { a: number }) => obj && obj.a === 1;
  const isB = (obj: { b: number }) => obj && obj.b === 1;
  const isC = (obj: { c: number }) => obj && obj.c;

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
  const funcLodash = lodash.cond(pairs as any) as (obj: any) => string;

  bench(
    'es-toolkit/compat/cond',
    () => {
      do_not_optimize(funcToolkit(objA));
      do_not_optimize(funcToolkit(objB));
      do_not_optimize(funcToolkit(objC));
      do_not_optimize(funcToolkit(objNone));
    },
    {
      time: 100,
    }
  );

  bench(
    'lodash/cond',
    () => {
      do_not_optimize(funcLodash(objA));
      do_not_optimize(funcLodash(objB));
      do_not_optimize(funcLodash(objC));
      do_not_optimize(funcLodash(objNone));
    },
    {
      time: 100,
    }
  );
});
