# remove

Removes elements from an array based on a predicate function.

This function changes `arr` in place.
If you want to remove elements without modifying the original array, use [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

## Signature

```typescript
function remove<T>(arr: T[], shouldRemoveElement: (value: T, index: number, array: T[]) => boolean): T[];
```

### Parameters

- `arr` (`T[]`): The array to modify.
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): The function invoked per iteration to determine if an element should be removed.

### Returns

(`T[]`): The modified array with the specified elements removed.

## Examples

```typescript
const numbers = [1, 2, 3, 4, 5];
remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5]
```
