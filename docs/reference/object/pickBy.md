# pickBy

Creates a new object composed of the properties that satisfy the predicate function.

This function takes an object and a predicate function, and returns a new object that
includes only the properties for which the predicate function returns `true`.

## Signature

```typescript
function pickBy<T extends Record<string, any>>(
  obj: T,
  shouldPick: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

### Parameters

- `obj` (`T`): The object to pick properties from.
- `shouldPick` (`(value: T[keyof T], key: keyof T) => boolean`): A predicate function that determines whether a property should be picked. It takes the property's key and value as arguments and returns `true` if the property should be picked, and `false` otherwise.

### Returns

(`Partial<T>`): A new object with the properties that satisfy the predicate function.

## Examples

```typescript
const obj = { a: 1, b: 'pick', c: 3 };
const shouldPick = (value, key) => typeof value === 'string';
const result = pickBy(obj, shouldPick);
// result will be { b: 'pick' }
```
