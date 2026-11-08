import { every as everyEsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const generateArray = (length: number, max: number) => Array.from({ length }, () => Math.floor(Math.random() * max));
const array = generateArray(1_000_000, 1000);

group('every, all true', () => {
  const alwaysTruePredicate = () => true;

  bench('es-toolkit/every, all true', () => {
    everyEsToolkit(array, alwaysTruePredicate);
  });

  bench('lodash/every, all true', () => {
    lodash.every(array, alwaysTruePredicate);
  });
});

group('every, all false', () => {
  const alwaysFalsePredicate = () => false;

  bench('es-toolkit/every, all false', () => {
    everyEsToolkit(array, alwaysFalsePredicate);
  });

  bench('lodash/every, all false', () => {
    lodash.every(array, alwaysFalsePredicate);
  });
});

group('every, fail in middle', () => {
  const middleFailPredicate = (n: number, index: number) => index < array.length / 2;

  bench('es-toolkit/every, fail in middle', () => {
    everyEsToolkit(array, middleFailPredicate);
  });

  bench('lodash/every, fail in middle', () => {
    lodash.every(array, middleFailPredicate);
  });
});
