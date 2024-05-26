# shuffle

Randomizes the order of elements in an array using the Fisher-Yates algorithm.

This function takes an array and returns a new array with its elements shuffled in a random order.

## Signature

```typescript
function shuffle<T>(arr: T[]): T[];
```

### Parameters 

- `arr` (`T[]`): The array to shuffle.

### Returns

(`T[]`): A new array with its elements shuffled in random order.

## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const shuffledArray = shuffle(array);
// shuffledArray will be a new array with elements of array in random order, e.g., [3, 1, 4, 5, 2]
```