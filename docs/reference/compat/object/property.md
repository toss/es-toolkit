# property

::: info
This function is fully compatible with lodash. You can find it in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
:::

Creates a function that returns the value at a given path of an object.
It leverages the [`get`](./get.md) functions to obtain the value.

## Signature

```typescript
function property(path: PropertyKey | readonly PropertyKey[]): (object: unknown) => any;
```

### Parameters

- `path` (`string` or `number` or `symbol` or `Array<string | number | symbol>`): The path of the property to get.

### Returns

(`(object: unknown) => any`): A new function that takes an object and returns the value at the specified path.

### Examples

```typescript
import { property } from 'es-toolkit/compat';

const getObjectValue = property('a.b.c');
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3

const getObjectValue = property(['a', 'b', 'c']);
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3
```
