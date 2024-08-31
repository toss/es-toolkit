# fromEntries

Convert a two-dimensional array or Map-type data into an object. It achieves the same effect as Object.fromEntries but with potentially better performance.

## Signature

```typescript
function fromEntries<T extends string | number | symbol, U>(data: Array<[string | number | symbol, U]> | Map<string | number | symbol, U>): { [key in T]: U }
```

### Parameters

- `data` (`Array<[string | number | symbol, U]> | Map<string | number | symbol, U>`): The two-dimensional array or Map-type data to be converted. Each sub-array in the two-dimensional array should have two elements, with the first element as the key and the second as the value.

### Returns

(`{ [key in T]: U }`): The converted object with the same keys and values as the input parameters.

## Examples

```typescript
const data = [['a', 1], ['b', 2], ['c', 3]];
const result = fromEntries(data);  
// result will be { a: 1, b: 2, c: 3 }
```