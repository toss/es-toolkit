# ary (Lodash Compatibility)

::: warning Use [`ary`](../../function/ary.md) from `es-toolkit`

This `ary` function operates slowly due to complex parameter validation.

Instead, use the faster and more modern [ary](../../function/ary.md) from `es-toolkit`.

:::

Creates a function that limits the number of arguments it can receive.

```typescript
const cappedFunction = ary(func, n);
```

## Usage

### `ary(func, n)`

Use `ary` when you want to limit the number of arguments a function receives. It's useful for safely using functions that receive too many arguments or ignoring unnecessary arguments in callback functions.

```typescript
import { ary } from 'es-toolkit/compat';

// Basic usage
function greet(name, age, city) {
  return `Hello, ${name}! ${age} years old, from ${city}.`;
}

const limitedGreet = ary(greet, 2);
console.log(limitedGreet('John', 30, 'Seoul', 'extraArg'));
// "Hello, John! 30 years old, from undefined."
// Arguments from the 3rd onwards are ignored
```

You can prevent unnecessary arguments from being passed to callback functions when using them with array methods.

```typescript
import { ary } from 'es-toolkit/compat';

// parseInt accepts a second argument (radix), but map's callback passes 3 arguments
const numbers = ['1', '2', '3', '4', '5'];

// Incorrect usage - parseInt receives the index as radix
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN]

// Use ary to pass only the first argument
console.log(numbers.map(ary(parseInt, 1))); // [1, 2, 3, 4, 5]
```

You can limit functions to receive only the desired number of parameter arguments.

```typescript
import { ary } from 'es-toolkit/compat';

function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}

const sum0 = ary(sum, 0);
const sum1 = ary(sum, 1);
const sum2 = ary(sum, 2);
const sum3 = ary(sum, 3);

console.log(sum0(1, 2, 3, 4, 5)); // 0 (no arguments)
console.log(sum1(1, 2, 3, 4, 5)); // 1 (first argument only)
console.log(sum2(1, 2, 3, 4, 5)); // 3 (first two arguments only)
console.log(sum3(1, 2, 3, 4, 5)); // 6 (first three arguments only)
```

When passing a negative number or `NaN`, it's treated as 0 and all arguments are ignored.

```typescript
import { ary } from 'es-toolkit/compat';

const func = (a, b, c) => [a, b, c];

console.log(ary(func, -1)(1, 2, 3)); // [] (negative treated as 0)
console.log(ary(func, NaN)(1, 2, 3)); // [] (NaN treated as 0)
```

#### Parameters

- `func` (`Function`): The function to cap arguments for.
- `n` (`number`, optional): The maximum number of arguments to allow. If omitted, uses the function's `length` property.

#### Returns

(`Function`): Returns a new function that accepts at most `n` arguments.
