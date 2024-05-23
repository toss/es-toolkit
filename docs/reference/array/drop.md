# drop

Removes a specified number of elements from the beginning of an array and returns the rest.

This function takes an array and a number, and returns a new array with the specified number 
of elements removed from the start.

## Signature

```typescript
function drop<T>(arr: T[], itemsCount: number): T[];
```

## Examples

```typescript
// Example usage:
const array = [1, 2, 3, 4, 5];
const result = drop(array, 2);
// result will be [3, 4, 5] since the first two elements are dropped.
```
