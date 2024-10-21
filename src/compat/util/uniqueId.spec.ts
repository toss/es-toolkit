import { describe, expect, it } from 'vitest';
import { uniqueId } from './uniqueId';

describe('uniqueId', () => {
  it('should generate unique numeric IDs when called without a prefix', () => {
    const id1 = uniqueId();
    const id2 = uniqueId();

    expect(id1).toBe('1');
    expect(id2).toBe('2');
  });

  it('should append increasing numeric IDs to the given prefix', () => {
    const prefixedId1 = uniqueId('test_');
    const prefixedId2 = uniqueId('test_');

    expect(prefixedId1).toBe('test_3');
    expect(prefixedId2).toBe('test_4');
  });

  it('should handle empty string prefix', () => {
    const id = uniqueId('');
    expect(id).toBe('5');
  });

  it('should generate consecutive IDs across different prefix types', () => {
    expect(uniqueId('prefix_')).toBe('prefix_6');
    expect(uniqueId()).toBe('7');
    expect(uniqueId('another_')).toBe('another_8');
  });
});
