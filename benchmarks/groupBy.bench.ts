import { bench, describe } from 'vitest';
import { groupBy as groupByToolkit } from 'es-toolkit';
import { groupBy as groupByLodash } from 'lodash';

describe('groupBy', () => {
  bench('es-toolkit', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    groupByToolkit(array, item => item.category);
  });

  bench('lodash', () => {
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
