import { describe, it, expect } from 'vitest';
import { groupBy } from './groupBy';

describe('groupBy', () => {
  it('should group elements by a given key', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' }
    ];
    
    const result = groupBy(array, item => item.category);
    
    expect(result).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
        { category: 'fruit', name: 'pear' }
      ],
      vegetable: [
        { category: 'vegetable', name: 'carrot' },
        { category: 'vegetable', name: 'broccoli' }
      ]
    });
  });

  it('should handle an empty array', () => {
    const array: Array<{ category: string, name: string }> = [];
    
    const result = groupBy(array, item => item.category);
    
    expect(result).toEqual({});
  });

  it('should handle an array with one element', () => {
    const array = [
      { category: 'fruit', name: 'apple' }
    ];
    
    const result = groupBy(array, item => item.category);
    
    expect(result).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' }
      ]
    });
  });

  it('should group elements by a numeric key', () => {
    const array = [
      { score: 1, name: 'John' },
      { score: 2, name: 'Jane' },
      { score: 1, name: 'Joe' }
    ];
    
    const result = groupBy(array, item => item.score.toString());
    
    expect(result).toEqual({
      '1': [
        { score: 1, name: 'John' },
        { score: 1, name: 'Joe' }
      ],
      '2': [
        { score: 2, name: 'Jane' }
      ]
    });
  });

  it('should handle duplicate keys correctly', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'apple' }
    ];
    
    const result = groupBy(array, item => item.category);
    
    expect(result).toEqual({
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'apple' }
      ]
    });
  });
});
