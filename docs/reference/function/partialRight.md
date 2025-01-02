# partialRight

Creates a function that invokes `func` with `partialArgs` appended to the arguments it receives.

This method is like [partial](./partial.md), except that partially applied arguments are appended to the arguments it receives.

The `partialRight.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.

Note: This method doesn't set the `length` property of partially applied functions.

## Signature

```typescript
function partialRight<F extends Function>(func: F, ...partialArgs: any[]): (...args: any[]) => ReturnType<F>;

namespace partialRight {
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
import { partialRight } from 'es-toolkit/function';

function greet(greeting, name) {
  return greeting + ' ' + name;
}

const greetFred = partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'

// Partially applied with placeholders.
const sayHelloTo = partialRight(greet, 'hello', partialRight.placeholder);
sayHelloTo('fred');
// => 'hello fred'
```
