import { overArgs as overArgsToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

function doubled(n: number) {
  return n * 2;
}

function square(n: number) {
  return n * n;
}

group('overArgs - basic function transforms', () => {
  bench('es-toolkit/overArgs - basic function transforms', () => {
    const func = overArgsToolkitCompat((x, y) => [x, y], [doubled, square]);
    do_not_optimize(func(5, 3));
    do_not_optimize(func(10, 5));
    do_not_optimize(func(20, 7));
  });

  bench('lodash/overArgs - basic function transforms', () => {
    const func = lodash.overArgs((x, y) => [x, y], [doubled, square]);
    do_not_optimize(func(5, 3));
    do_not_optimize(func(10, 5));
    do_not_optimize(func(20, 7));
  });
});

group('overArgs - property shorthand', () => {
  const user1 = { name: 'John', age: 30 };
  const user2 = { name: 'Jane', age: 25 };

  bench('es-toolkit/overArgs - property shorthand', () => {
    const func = overArgsToolkitCompat((name, age) => `${name} is ${age} years old`, ['name', 'age'] as any[]);
    do_not_optimize(func(user1, user2));
    do_not_optimize(func(user2, user1));
  });

  bench('lodash/overArgs - property shorthand', () => {
    const func = lodash.overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age'] as any[]);
    do_not_optimize(func(user1, user2));
    do_not_optimize(func(user2, user1));
  });
});

group('overArgs - many arguments', () => {
  const transforms = [doubled, square, doubled, square, doubled];

  bench('es-toolkit/overArgs - many arguments', () => {
    const func = overArgsToolkitCompat((a, b, c, d, e, f) => [a, b, c, d, e, f], transforms);
    do_not_optimize(func(1, 2, 3, 4, 5, 6));
    do_not_optimize(func(6, 5, 4, 3, 2, 1));
  });

  bench('lodash/overArgs - many arguments', () => {
    const func = lodash.overArgs((a, b, c, d, e, f) => [a, b, c, d, e, f], transforms);
    do_not_optimize(func(1, 2, 3, 4, 5, 6));
    do_not_optimize(func(6, 5, 4, 3, 2, 1));
  });
});
