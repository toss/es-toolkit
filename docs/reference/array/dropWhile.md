# dropWhile

Removes elements from the beginning of an array until the predicate returns `false`.

This function iterates over an array and drops elements from the start until the provided
predicate function returns `false`. It then returns a new array with the remaining elements.

## Signature

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T) => boolean): T[];
```

### Parameters

- `arr` (`T[]`): The array from which to drop elements.
- `canContinueDropping` (`(item: T) => boolean`): A predicate function that determines whether to continue dropping elements. The function is called with each element, and dropping continues as long as it returns `true`.

### Returns

(`T[]`) A new array with the elements remaining after the predicate returns `false`.

## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const result = dropWhile(array, x => x < 3);
// result will be [3, 4, 5] since elements less than 3 are dropped.
```
