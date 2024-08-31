import { describe, it, expect } from 'vitest';
import { spread } from './spread';

function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`;
}

// Tests
describe('spread', () => {
  it('should correctly transform a function with multiple arguments', () => {
    const spreadAdd = spread(add);
    expect(spreadAdd([1, 2])).toBe(3);
  });

  it('should correctly transform a function with default arguments', () => {
    const spreadGreet = spread(greet);
    expect(spreadGreet(['Alice'])).toBe('Hello, Alice!');
    expect(spreadGreet(['Bob', 'Hi'])).toBe('Hi, Bob!');
  });

  it('should handle functions with varying argument lengths', () => {
    function concat(...args: string[]): string {
      return args.join(' ');
    }

    const spreadConcat = spread(concat);
    expect(spreadConcat(['Hello', 'World', 'Vitest'])).toBe('Hello World Vitest');
  });

  it('should maintain the context of `this` when calling the original function', () => {
    function greetWithContext(this: { greeting: string }, name: string): string {
      return `${this.greeting}, ${name}!`;
    }

    const context = { greeting: 'Hey' };
    const spreadGreetWithContext = spread(greetWithContext.bind(context));

    expect(spreadGreetWithContext(['Alice'])).toBe('Hey, Alice!');
  });
});
