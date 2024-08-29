# has

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if a given path exists within an object.

You can provide the path as a single property key, an array of property keys,
or a string representing a deep path.

If the path is an index and the object is an array or an arguments object,
the function will verify if the index is valid and within the bounds of the array
or arguments object, even if the array or arguments object is sparse
(i.e., not all indexes are defined).

## Signature

```typescript
function has(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;
```

### Parameters

- `object` (`unknown`): The object to query.
- `path` (`string` or `number` or `symbol` or `Array<string | number | symbol>`): The path to check. This can be a single property key, an array of property keys, or a string representing a deep path.

### Returns

(`boolean`): Returns `true` if the path exists in the object, `false` otherwise.

## Examples

```typescript
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

has(obj, 'a'); // true
has(obj, ['a', 'b']); // true
has(obj, ['a', 'b', 'c']); // true
has(obj, 'a.b.c'); // true
has(obj, 'a.b.d'); // false
has(obj, ['a', 'b', 'c', 'd']); // false
has([], 0); // false
has([1, 2, 3], 2); // true
has([1, 2, 3], 5); // false
```

## Demo

::: sandpack

```ts index.ts
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

console.log(has(obj, 'a.b.c'));
```

:::
