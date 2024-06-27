# uniqWith

Returns a new array containing only the unique elements from the original array, based on the values returned by the comparator function.

## Signature

```typescript
function uniqWith<T>(arr: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### Parameters

- `arr` (`T[]`): The array to process.
- `areItemsEqual` (`(x: T, y: T) => boolean`): A custom function to determine if two elements are equal. This function takes two arguments, one from each array, and returns true if the elements are considered equal, and false otherwise.

### Returns

(`T[]`): A new array containing only the unique elements from the original array, based on the values returned by the comparator function.

## Examples

```typescript
uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1);
// [1.2, 3.2, 5.7, 7.19]
```
