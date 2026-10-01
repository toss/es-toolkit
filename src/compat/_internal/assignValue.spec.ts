import { describe, expect, it } from 'vitest';
import { assignValue } from './assignValue';

describe('assignValue', () => {
  it('should assign a value to an object', () => {
    const object: Record<string, any> = {};
    assignValue(object, 'a', 1);
    expect(object.a).toBe(1);
  });

  it('should preserve own __proto__ property and not set as prototype', () => {
    const object: Record<string, any> = {};
    assignValue(object, '__proto__', { isAdmin: true });

    expect(Object.hasOwn(object, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(object)).toBe(Object.prototype);
    expect((object as any).isAdmin).toBeUndefined();
  });
});
