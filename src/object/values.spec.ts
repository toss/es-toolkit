import { describe, expect, it } from 'vitest';
import { values } from './values';

describe('values', () => {
    it('should return an array of the values of the object', () => {
        const obj = { a: 1, b: 'hello', c: true };
        const result = values(obj);
        expect(result).toEqual([1, 'hello', true]);
    });

    it('should return an array of characters in case a string is passed', () => {
        // @ts-expect-error (a string is not the ideal param for this function but for keeping parity with lodash
        // this case should be tested.
        const result = values('hello');
        expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
    });

    it('should return an empty array for an empty object', () => {
        const result = values({});
        expect(result).toEqual([]);
    });

    it('should work with an array-like object', () => {
        const obj = { 0: 'a', 1: 'b', 2: 'c' };
        const result = values(obj);
        expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should return values for nested objects', () => {
        const obj = { a: { nested: 'hello' }, b: 2 };
        const result = values(obj);
        expect(result).toEqual([{ nested: 'hello' }, 2]);
    });
});
