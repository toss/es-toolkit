# omitBy

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../compatibility.md).
:::

The opposite of `pickBy`; this method creates an object composed of the own and inherited enumerable string keyed properties of `object` that `predicate` doesn't return truthy for. The predicate is invoked with two arguments: (value, key).

## Signature

```typescript
function omitBy<T extends Record<string, any>>(
  obj: T,
  shouldOmit?: (value: T[keyof T], key: keyof T, obj: T) => boolean
): Partial<T>;
```

### Parameters

- `obj` (`T`): The object to omit properties from.
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): A predicate function that determines
  whether a property should be omitted. It takes the property's key and value as arguments and returns `true`
  if the property should be omitted, and `false` otherwise.

### Returns

(`Partial<T>`): A new object with the properties that do not satisfy the predicate function.

## Examples

```typescript
const obj = { a: 1, b: 'omit', c: 3 };
const shouldOmit = (value, key) => typeof value === 'string';
const result = omitBy(obj, shouldOmit);
// result will be { a: 1, c: 3 }
```
