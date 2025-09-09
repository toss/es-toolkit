import { bench, describe } from 'vitest';
import { overArgs as overArgsToolkitCompat_ } from 'es-toolkit/compat';
import { overArgs as overArgsLodash_ } from 'lodash';

const overArgsToolkitCompat = overArgsToolkitCompat_;
const overArgsLodash = overArgsLodash_;

function doubled(n: number) {
  return n * 2;
}

function square(n: number) {
  return n * n;
}

describe('overArgs - basic function transforms', () => {
  bench('es-toolkit/overArgs - basic function transforms', () => {
    const func = overArgsToolkitCompat((x, y) => [x, y], [doubled, square]);
    func(5, 3);
    func(10, 5);
    func(20, 7);
  });

  bench('lodash/overArgs - basic function transforms', () => {
    const func = overArgsLodash((x, y) => [x, y], [doubled, square]);
    func(5, 3);
    func(10, 5);
    func(20, 7);
  });
});

describe('overArgs - property shorthand', () => {
  const user1 = { name: 'John', age: 30 };
  const user2 = { name: 'Jane', age: 25 };

  bench('es-toolkit/overArgs - property shorthand', () => {
    const func = overArgsToolkitCompat((name, age) => `${name} is ${age} years old`, ['name', 'age']);
    func(user1, user2);
    func(user2, user1);
  });

  bench('lodash/overArgs - property shorthand', () => {
    const func = overArgsLodash((name, age) => `${name} is ${age} years old`, ['name', 'age']);
    func(user1, user2);
    func(user2, user1);
  });
});

describe('overArgs - many arguments', () => {
  const transforms = [doubled, square, doubled, square, doubled];

  bench('es-toolkit/overArgs - many arguments', () => {
    const func = overArgsToolkitCompat((a, b, c, d, e, f) => [a, b, c, d, e, f], transforms);
    func(1, 2, 3, 4, 5, 6);
    func(6, 5, 4, 3, 2, 1);
  });

  bench('lodash/overArgs - many arguments', () => {
    const func = overArgsLodash((a, b, c, d, e, f) => [a, b, c, d, e, f], transforms);
    func(1, 2, 3, 4, 5, 6);
    func(6, 5, 4, 3, 2, 1);
  });
});
