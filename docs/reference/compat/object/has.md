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
function has<T, K extends PropertyKey>(
  object: T,
  path: K
): object is T & { [P in K]: P extends keyof T ? T[P] : Record<string, unknown> extends T ? T[keyof T] : unknown } & {
  [key: symbol]: unknown;
};
function has<T>(object: T, path: PropertyKey | PropertyKey[]): boolean;
```

### Parameters

- `object` (`T`): The object to query.
- `path` (`PropertyKey | PropertyKey[]`): The path to check. This can be a single property key, an array of property keys, or a string representing a deep path.

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
