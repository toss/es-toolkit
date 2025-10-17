# values (Lodash Compatibility)

::: warning Use `Object.values` instead

This `values` function simply calls `Object.values` with unnecessary overhead.

Use the faster and more modern `Object.values()` directly instead.

:::

Returns an array of the object's own enumerable property values.

```typescript
const valueArray = values(object);
```

## Interface

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### Parameters

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): The object to query.

### Returns

(`T[]`): An array of property values.

## Examples

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
