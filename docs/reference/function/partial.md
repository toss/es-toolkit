# partial

Creates a function that invokes `func` with `partialArgs` prepended to the arguments it receives.

This method is like [bind](../compat/function/bind.md) except it does not alter the `this` binding.

The `partial.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.

Note: This method doesn't set the `length` property of partially applied functions.

## Signature

```typescript
function partial<F extends Function>(func: F, ...partialArgs: any[]): (...args: any[]) => ReturnType<F>;

namespace partial {
  placeholder: symbol;
}
```

### Parameters

- `func` (`F`): The function to partially apply arguments to.
- `partialArgs` (`any[]`, optional): The arguments to be partially applied.

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns the new partially applied function.

## Examples

```typescript
import { partial } from 'es-toolkit/function';

function greet(greeting, name) {
  return greeting + ' ' + name;
}

const sayHelloTo = partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'

// Partially applied with placeholders.
const greetFred = partial(greet, partial.placeholder, 'fred');
greetFred('hi');
// => 'hi fred'
```
