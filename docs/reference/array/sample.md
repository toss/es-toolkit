# sample

Returns a random element from an array.

This function takes an array and returns a single element selected randomly from the array.

## Signature

```typescript
function sample<T>(arr: T[]): T;
```

### Parameters

- `arr` (`T[]`): The array to sample from.

### Returns

(`T`): A random element from the array.

## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const randomElement = sample(array);
// randomElement will be one of the elements from the array, selected randomly.
```
