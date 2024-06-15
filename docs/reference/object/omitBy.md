# omitBy

Creates a new object composed of the properties that do not satisfy the predicate function.

This function takes an object and a predicate function, and returns a new object that
includes only the properties for which the predicate function returns false.

## Signature

```typescript
function omitBy<T extends Record<string, any>>(obj: T, shouldOmit: (value: T[keyof T], key: keyof T) => boolean): Partial<T>;
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
