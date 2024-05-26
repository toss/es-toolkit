# takeRightWhile

Takes elements from the end of the array while the predicate function returns `true`.

## Signature

```typescript
function takeRightWhile<T>(arr: T[], shouldContinueTaking: (item: T) => boolean): T[]
```

### Parameters 

- `arr` (`T[]`): The array to take elements from.
- `shouldContinueTaking` (`(item: T) => boolean`) The function invoked per element.

### Returns

(`T[]`) A new array containing the elements taken from the end while the predicate returns `true`.


## Examples

```typescript
// Returns [3, 2, 1]
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);

// Returns []
takeRightWhile([1, 2, 3], n => n > 3);
```