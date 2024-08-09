# bind

::: info
This function is fully compatible with lodash. You can find it in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
:::

Creates a function that invokes `func` with the `this` binding of `thisObj` and `partials` prepended to the arguments it receives.

The `bind.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.

Note that unlike native `Function#bind`, this method doesn't set the `length` property of bound functions.

## Signature

```typescript
function bind<F extends Function>(func: F, thisObj?: unknown, ...partialArgs: any[]): F;

namespace bind {
  placeholder: symbol;
}
```

### Parameters

- `func` (`F`): The function to bind.
- `thisObj` (`any`, optional): The `this` binding of `func`.
- `partialArgs` (`any[]`): The arguments to be partially applied.

### Returns

(`F`): Returns the new bound function.

## Examples

```typescript
import { bind } from 'es-toolkit/compat';

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: 'fred' };

let bound = bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// Bound with placeholders.
bound = bind(greet, object, bind.placeholder, '!');
bound('hi');
// => 'hi fred!'
```
