# conformsTo

Checks if `object` conforms to `source` by invoking the predicate properties of `source` with the corresponding property values of `object`.

Note: This method is equivalent to [`conforms`](./conforms.md) when source is partially applied.

## Signature

```typescript
function conformsTo(object: Record<PropertyKey, any>, source: Record<PropertyKey, (value: any) => boolean>): boolean;
```

### Parameters

- `object` (`Record<PropertyKey, any>`): The object to inspect.
- `source` (`Record<PropertyKey, (value: any) => boolean>`): The object of property predicates to conform to.

### Returns

`boolean`: Returns `true` if `object` conforms, else `false`.

## Example

```typescript
const object = { a: 1, b: 2 };

conformsTo(object, {
  b: n => n > 1,
});
// => true

conformsTo(object, {
  b: n => n > 2,
});
// => false
```
