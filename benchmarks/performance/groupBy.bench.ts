import { bench, describe } from 'vitest';
import { groupBy as groupByToolkit_ } from 'es-toolkit';
import { groupBy as groupByToolkitCompat_ } from 'es-toolkit/compat';
import { groupBy as groupByLodash_ } from 'lodash';

const groupByToolkit = groupByToolkit_;
const groupByToolkitCompat = groupByToolkitCompat_;
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

  bench('es-toolkit/compat/groupBy', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    groupByToolkitCompat(array, item => item.category);
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

describe('groupBy/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ({
    category: i % 2 === 0 ? 'even' : 'odd',
    value: i,
  }));

  bench('es-toolkit/groupBy', () => {
    groupByToolkit(largeArray, item => item.category);
  });

  bench('lodash/groupBy', () => {
    groupByLodash(largeArray, item => item.category);
  });
});
