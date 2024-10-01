import { bench, describe } from 'vitest';
import { groupBy as groupByToolkit_ } from 'es-toolkit';
import { groupBy as groupByLodash_ } from 'lodash';

const groupByToolkit = groupByToolkit_;
const groupByLodash = groupByLodash_;

describe('groupBy', () => {
  bench('es-toolkit/groupBy', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    groupByToolkit(array, item => item.category);
  });

  bench('lodash/groupBy', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    groupByLodash(array, item => item.category);
  });
});
