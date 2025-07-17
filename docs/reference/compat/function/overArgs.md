# overArgs

Creates a function that invokes `func` with its arguments transformed by corresponding transform functions.

Transform functions can be:

- Functions that accept and return a value
- Property names (strings) to get a property value from each argument
- Objects to check if arguments match the object properties
- Arrays of [property, value] to check if argument properties match values

If a transform is nullish, the identity function is used instead.
Only transforms arguments up to the number of transform functions provided.

## Signature

```typescript
function overArgs<F extends (...args: any[]) => any, T extends Array<any>>(
  func: F,
  transforms: T
): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to wrap.
- `transforms` (`T`): The functions to transform arguments.

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
