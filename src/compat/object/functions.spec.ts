import { describe, expect, it } from 'vitest';
import { functions } from './functions';
import { noop } from '../../function/noop';
import { identity } from '../../function/identity';

describe('functions', () => {
    it('should return the function names of an object', () => {
        const object = { a: 'a', b: identity, c: /x/, d: noop };
        const actual = functions(object).sort();

        expect(actual).toEqual(['b', 'd']);
    });

    it('should not include inherited functions', () => {
        function Foo(this: { a: typeof identity, b: string }) {
            this.a = identity;
            this.b = 'b';
        }
        Foo.prototype.c = noop;
        // @ts-expect-error - Foo is a constructor
        expect(functions(new Foo())).toEqual(['a']);
    });

    it('should return an empty array for null', () => {
        expect(functions(null)).toEqual([]);
    });

    it('should return an empty array for undefined', () => {
        expect(functions(undefined)).toEqual([]);
    });
});