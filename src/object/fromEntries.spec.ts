import { describe, it, expect } from 'vitest';  
import { fromEntries } from './fromEntries';
  
describe('fromPairs', () => {  
  it('should convert an array of key-value pairs into an object', () => {  
    const result = fromEntries([['a', 1], ['b', 2], ['c', 3]]);  
    const expected = { a: 1, b: 2, c: 3 };  
    expect(result).toEqual(expected);  
  });  
  
  it('should handle different types of keys', () => {   
    const result = fromEntries([[1, 'one'], [2, 'two'], [3, 'three']]);  
    const expected = { 1: 'one', 2: 'two', 3: 'three' };  
    expect(result).toEqual(expected);  
  });  

  it('should handle Symbol type keys', () => {  
    const sym1 = Symbol('sym1');  
    const sym2 = Symbol('sym2');   
    const result = fromEntries([[sym1, 'value1'], [sym2, 'value2']]);  
    const expected = { [sym1]: 'value1', [sym2]: 'value2' };  
    expect(result).toEqual(expected);  
  });  
  
  it('should handle Map objects', () => {  
    const map = new Map([['a', 1], ['b', 2], ['c', 3]]);  
    const result = fromEntries(map);  
    const expected = { a: 1, b: 2, c: 3 };  
    expect(result).toEqual(expected);  
  });   
});