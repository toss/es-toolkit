# spread

Creates a new function that spreads elements of an array argument into individual arguments for the original function.

## Signature

```typescript
function spread<F extends (...args: any[]) => any>(func: F): (argsArr: Parameters<F>) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to be transformed. It can be any function with any number of arguments.

### Returns

(`(args: Parameters<F>) => ReturnType<F>`): A new function that takes an array of arguments and returns the result of calling the original function with those arguments.

## Examples

```typescript
import { spread } from 'es-toolkit/function';

function add(a, b) {
  return a + b;
}
const spreadAdd = spread(add);
console.log(spreadAdd([1, 2])); // Output: 3

// Example function to spread arguments over
// Create a new function that uses `spread` to combine arguments
const spreadAdd = spread(add, 1);
// Calling `spreadAdd` with an array as the second argument
console.log(spreadAdd(1, [2])); // Output: 3

// Function with default arguments
function greet(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}
// Create a new function that uses `spread` to position the argument array at index 0
const spreadGreet = spread(greet, 0);
// Calling `spreadGreet` with an array of arguments
console.log(spreadGreet(['Alice'])); // Output: Hello, Alice!
console.log(spreadGreet(['Bob', 'Hi'])); // Output: Hi, Bob!
```

## Lodash Compatibility

Import `spread` from `es-toolkit/compat` for full compatibility with lodash.

- `spread` accepts an additional numeric parameter, `argsIndex`, which specifies the position at which the argument array is positioned among the preceding parameters.
  - If `argsIndex` is negative or `NaN`, it defaults to `0`. If it's a fractional number, it is rounded down to the nearest integer.

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // Returns [1, 2]
spread(fn, NaN)([1, 2]); // Returns [1, 2]
spread(fn, 'a')([1, 2]); // Returns [1, 2]
spread(fn, 1.6)(1, [2, 3]); // Returns [1, 2, 3]
```
