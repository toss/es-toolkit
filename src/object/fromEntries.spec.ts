import { describe, it, expect } from 'vitest';  
import { fromEntries } from './fromEntries';
  
describe('fromPairs', () => {  
  it('should convert an array of key-value pairs into an object', () => {  
    const data = [['a', 1], ['b', 2], ['c', 3]];  
    const expected = { a: 1, b: 2, c: 3 };  
    const result = fromEntries(data);  
    expect(result).toEqual(expected);  
  });  
  
  it('should handle different types of keys', () => {  
    const data = [[1, 'one'], [2, 'two'], [3, 'three']];  
    const expected = { 1: 'one', 2: 'two', 3: 'three' };  
    const result = fromEntries(data);  
    expect(result).toEqual(expected);  
  });  

  it('should handle Symbol type keys', () => {  
    const sym1 = Symbol('sym1');  
    const sym2 = Symbol('sym2');  
    const data = [[sym1, 'value1'], [sym2, 'value2']];  
    const expected = { [sym1]: 'value1', [sym2]: 'value2' };  
    const result = fromEntries(data);  
    expect(result).toEqual(expected);  
  });  
  
  it('should handle Map objects', () => {  
    const map = new Map([['a', 1], ['b', 2], ['c', 3]]);  
    const expected = { a: 1, b: 2, c: 3 };  
    const result = fromEntries(map);  
    expect(result).toEqual(expected);  
  });   
});