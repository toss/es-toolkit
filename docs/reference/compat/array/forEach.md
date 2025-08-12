# forEach

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Iterates over properties of `object` invokes `callback` for each property.

The iteration stops if the `callback` function returns `false`.

## Signature

```ts
function forEach<T extends object>(object: T, callback: (value: T[keyof T], key: keyof T, object: T) => void): T;
```

### Parameters

- `object` (`T`): The object to iterate over.
- `callback` (`(value: T[keyof T], key: keyof T, object: T)`): The function invoked per iteration.
  - `value`: The current property being processed in the object.
  - `index`: The key of the current property being processed in the object.
  - `object`: The object `forEach` was called upon.

### Returns

(`T`): The object `forEach` was called upon.

## Examples

```ts
import { forEach } from 'es-toolkit/compat';

const object = { a: 1, b: 2 };
forEach(object, (value, key, object) => console.log(value, key));
// Output:
// 1 'a'
// 2 'b'
```
