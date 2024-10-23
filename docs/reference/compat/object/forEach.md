# forEachRight

Iterates over properties of `object` invokes `callback` for each property.

## Signature

```ts
function forEach<T extends object>(object: T, callback: (value: T[keyof T], key: keyof T, object: T) => void): T;
```

### Parameters

- `object` (`T`): The object to iterate over.
- `callback` (`(value: T[keyof T], key: T, object: T)`): The function invoked per iteration.
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
