import { bench, describe } from 'vitest';
import { pipe as pipeToolkit_ } from 'es-toolkit/fp';
import { pipe as pipeLodash_ } from 'lodash/fp';
import { pipe as pipeRamda_ } from 'ramda';

const pipeToolkit = pipeToolkit_;
const pipeLodash = pipeLodash_;
const pipeRamda = pipeRamda_;

function toString(value) {
  return String(value);
}

function curriedMap<T, R>(mapper: (value: T) => R) {
  return (arr: T[]) => {
    const result: R[] = [];

    for (const item of arr) {
      result.push(mapper(item));
    }

    return result;
  };
}

function double<T>(arr: T[]) {
  const result = [...arr, ...arr];

  return result;
}

describe('pipe', () => {
  bench('es-toolkit/fp/pipe', () => {
    pipeToolkit([1, 2, 3], curriedMap(toString), double);
  });

  bench('lodash/fp/pipe', () => {
    pipeLodash(curriedMap(toString), double)([1, 2, 3]);
  });

  bench('ramda/pipe', () => {
    pipeRamda(curriedMap(toString), double)([1, 2, 3]);
  });
});
