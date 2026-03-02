# partial

Creates a new function with some arguments pre-applied.

```typescript
const partialFunc = partial(func, arg1, arg2);
```

## Usage

### `partial(func, ...args)`

Use `partial` when you want to fix some arguments of a function in advance. Pre-provided arguments are placed at the front of the function, and arguments passed later are added to the back.

This is similar to the concept of currying, which is frequently used in functional programming. Unlike `bind`, it doesn't fix the `this` context.

You can use `partial.placeholder` to pass specific arguments later.

```typescript
import { partial } from 'es-toolkit/function';

// Basic usage
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
console.log(sayHello('John')); // 'Hello, John!'
console.log(sayHello('Jane')); // 'Hello, Jane!'

// Applying multiple arguments
function multiply(a: number, b: number, c: number) {
  return a * b * c;
}

const double = partial(multiply, 2);
console.log(double(3, 4)); // 24

const doubleAndTriple = partial(multiply, 2, 3);
console.log(doubleAndTriple(4)); // 24
```

You can adjust the argument order using placeholders.

```typescript
import { partial } from 'es-toolkit/function';

function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

// Fix only the second argument, pass the first and third later
const subtractFrom5 = partial(subtract, partial.placeholder, 5, partial.placeholder);
console.log(subtractFrom5(10, 2)); // 10 - 5 - 2 = 3

// Using with array methods
const numbers = [1, 2, 3, 4, 5];
const addTen = partial((x: number, y: number) => x + y, 10);
const result = numbers.map(addTen);
console.log(result); // [11, 12, 13, 14, 15]
```

#### Parameters

- `func` (`F`): The function to partially apply arguments to.
- `args` (`any[]`, optional): The arguments to pre-apply.

#### Returns

(`(...args: any[]) => ReturnType<F>`): Returns a new function with some arguments pre-applied.
