# bindKey

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes the method at `object[key]` with `partialArgs` prepended to the arguments it receives.

This method differs from [`bind`](./bind.md) by allowing bound functions to reference methods that may be redefined or don't yet exist.

The `bindKey.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.

## Signature

```typescript
function bindKey<T extends Record<PropertyKey, any>, K extends keyof T>(
  object: T,
  key: K,
  ...partialArgs: any[]
): T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never;

namespace bindKey {
  placeholder: symbol;
}
```

### Parameters

- `object` (`T`): The object to bind and call the method on.
- `key` (`K`): The key of the method to bind.
- `partialArgs` (`any[]`): The arguments to be partially applied.

### Returns

(`T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never`): Returns the new bound function.

## Example

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

let bound = bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'

object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

bound('!');
// => 'hiya fred!'

// Bound with placeholders.
bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// => 'hiya fred!'
```
