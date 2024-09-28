import { bench, describe } from 'vitest';
import { every as everyEsToolkit } from 'es-toolkit';
import { every as everyLodash } from 'lodash';

const generateArray = (length: number, max: number) => Array.from({ length }, () => Math.floor(Math.random() * max));
const array = generateArray(1_000_000, 1000);

describe('every, all true', () => {
  const alwaysTruePredicate = () => true;

  bench('es-toolkit/every, all true', () => {
    everyEsToolkit(array, alwaysTruePredicate);
  });

  bench('lodash/every, all true', () => {
    everyLodash(array, alwaysTruePredicate);
  });
});

describe('every, all false', () => {
  const alwaysFalsePredicate = () => false;

  bench('es-toolkit/every, all false', () => {
    everyEsToolkit(array, alwaysFalsePredicate);
  });

  bench('lodash/every, all false', () => {
    everyLodash(array, alwaysFalsePredicate);
  });
});

describe('every, fail in middle', () => {
  const middleFailPredicate = (n: number, index: number) => index < array.length / 2;

  bench('es-toolkit/every, fail in middle', () => {
    everyEsToolkit(array, middleFailPredicate);
  });

  bench('lodash/every, fail in middle', () => {
    everyLodash(array, middleFailPredicate);
  });
});
