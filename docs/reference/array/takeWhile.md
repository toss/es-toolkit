# takeWhile

Returns a new array containing the leading elements of the provided array
that satisfy the provided predicate function. It stops taking elements as soon
as an element does not satisfy the predicate.

## Signature

```typescript
function takeWhile<T>(arr: T[], shouldContinueTaking: (element: T) => boolean): T[];
```

### Parameters

- `arr` (`T[]`): The array to take elements from.
- `shouldContinueTaking` (`(item: T) => boolean`) The predicate function that is called with each element. Elements are included in the result as long as this function returns true.

### Returns

(`T[]`) A new array containing the elements taken from the beginning while the predicate returns `true`.

## Examples

```typescript
// Returns [1, 2]
takeWhile([1, 2, 3, 4], x => x < 3);

// Returns []
takeWhile([1, 2, 3, 4], x => x > 3);
```
