# conforms

Creates a function that invokes the predicate properties of `source` with the corresponding property values of a given object, returning `true` if all predicates return truthy, else `false`.

Note: The created function is equivalent to [`conformsTo`](./conformsTo.md) with source partially applied.

## Signature

```typescript
function conforms(source: Record<PropertyKey, (value: any) => boolean>): (object: Record<PropertyKey, any>) => boolean;
```

### Parameters

- `source` (`Record<PropertyKey, (value: any) => boolean>`): The object of property predicates to conform to.

### Returns

`(object: Record<PropertyKey, any>) => boolean`: The new spec function.

## Example

```typescript
const objects = [
  { a: 2, b: 1 },
  { a: 1, b: 2 },
];

objects.filter(
  conforms({
    b: n => n > 1,
  })
);
// => [{ 'a': 1, 'b': 2 }]
```
