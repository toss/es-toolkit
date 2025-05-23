# overArgs

Creates a function that invokes func with its arguments transformed by the corresponding transform functions.

## Signature

```typescript
function overArgs<F extends (...args: any[]) => any, T extends Array<any>>(
  func: F,
  transforms: T
): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to wrap.
- `transforms` (`T`): The functions to transform arguments. Transform functions can be:
  - Functions that accept and return a value
  - Strings for property access (e.g., 'name' accesses the name property)

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns a new function that transforms its arguments before passing them to func.

### Throws

Throws a TypeError if func is not a function.

## Examples

```typescript
import { overArgs } from 'es-toolkit/compat';

// With function transforms
function doubled(n: number) {
  return n * 2;
}

function square(n: number) {
  return n * n;
}

const func = overArgs((x, y) => [x, y], [doubled, square]);

func(5, 3);
// => [10, 9]

func(10, 5);
// => [20, 25]

// With property shorthand
const user = { name: 'John', age: 30 };
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);

getUserInfo(user, user);
// => "John is 30 years old"

// Only transform specific arguments
const partial = overArgs((a, b, c) => [a, b, c], [doubled]);

partial(5, 3, 2);
// => [10, 3, 2]
```
