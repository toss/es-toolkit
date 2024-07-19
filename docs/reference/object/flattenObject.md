# flattenObject

Flattens a nested object into a single-level object with dot-separated keys.

- `Array`s are flattened.
- Non-plain objects, like `Buffer`s or `TypedArray`s, are not flattened.

## Signature

```typescript
function flattenObject(object: object): Record<string, any>;
```

### Parameters

- `object` (`object`): The object to flatten.

### Returns

(`T`): The flattened object.

## Examples

```typescript
const nestedObject = {
  a: {
    b: {
      c: 1
    }
  },
  d: [2, 3]
};

const flattened = flattenObject(nestedObject);
console.log(flattened); 
// Output:
// {
//   'a.b.c': 1,
//   'd.0': 2,
//   'd.1': 3
// }
```
