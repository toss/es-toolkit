# values

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates an array of the own enumerable property values of `object`.

## Signature

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### Parameters

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): The object to query.

### Returns

(`T[]`): Returns an array of property values.

## Examples

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
