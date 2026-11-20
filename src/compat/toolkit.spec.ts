import { describe, expect, it } from 'vitest';
import { toolkit as _ } from './toolkit';

describe('toolkit', () => {
  it('should use `_` as the placeholder of `bind`', () => {
    function greet(this: { user: string }, greeting: string, punctuation: string) {
      return `${greeting} ${this.user}${punctuation}`;
    }

    const bound = _.bind(greet, { user: 'fred' }, _, '!');

    expect(bound('hi')).toBe('hi fred!');
  });

  it('should use `_` as the placeholder of `bindKey`', () => {
    const object = {
      user: 'fred',
      greet(greeting: string, punctuation: string) {
        return `${greeting} ${this.user}${punctuation}`;
      },
    };

    const bound = _.bindKey(object, 'greet', _, '!');

    expect(bound('hi')).toBe('hi fred!');
  });

  it('should use `_` as the placeholder of `curry`', () => {
    const curried = _.curry((a: number, b: number, c: number) => [a, b, c]);

    expect(curried(1)(_, 3)(2)).toEqual([1, 2, 3]);
    expect((curried as any).placeholder).toBe(_);
    expect((curried(1) as any).placeholder).toBe(_);
  });

  it('should use `_` as the placeholder of `curryRight`', () => {
    const curried = _.curryRight((a: number, b: number, c: number) => [a, b, c]);

    expect(curried(3)(1, _)(2)).toEqual([1, 2, 3]);
    expect((curried as any).placeholder).toBe(_);
    expect((curried(3) as any).placeholder).toBe(_);
  });
});
