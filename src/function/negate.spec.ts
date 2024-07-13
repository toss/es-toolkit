import { describe, it, expect } from 'vitest';
import { negate } from './negate';

describe('negate', () => {
    it('should be true', () => {
        expect(negate(() => undefined)()).toBe(true);
        expect(negate(() => null)()).toBe(true);
        expect(negate(() => +0)()).toBe(true);
        expect(negate(() => -0)()).toBe(true);
        expect(negate(() => NaN)()).toBe(true);
        expect(negate(() => 0)()).toBe(true);
        expect(negate(() => "")()).toBe(true);
        expect(negate(() => false)()).toBe(true);
    });

    it('should be false', () => {
        expect(negate(() => true)()).toBe(false);
        expect(negate(() => +1)()).toBe(false);
        expect(negate(() => -1)()).toBe(false);
        expect(negate(() => [])()).toBe(false);
        expect(negate(() => "string")()).toBe(false);
    });
});
