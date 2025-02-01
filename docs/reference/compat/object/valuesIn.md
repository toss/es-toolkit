# valuesIn

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Retrieves the values from an object, including those inherited from its prototype.

- If the value is not an object, it is converted to an object.
- Array-like objects are treated like arrays.
- Sparse arrays with some missing indices are treated like dense arrays.
- If the value is `null` or `undefined`, an empty array is returned.
- When handling prototype objects, the `constructor` property is excluded from the results.

## Signature

```typescript
function valuesIn<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function valuesIn<T>(arr: ArrayLike<T>): T[];
function valuesIn<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### Parameters

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): The object to query.

### Returns

(`T[]`): Returns an array of property values.

## Examples

```typescript
const obj = { a: 1, b: 2, c: 3 };
valuesIn(obj); // => [1, 2, 3]
```
