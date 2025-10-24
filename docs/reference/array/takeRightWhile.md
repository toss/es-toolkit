# takeRightWhile

Returns a new array by taking elements from the end of the array while the condition function returns true.

```typescript
const result = takeRightWhile(arr, shouldContinueTaking);
```

## Reference

### `takeRightWhile(arr, shouldContinueTaking)`

Use `takeRightWhile` when you want to take elements from the end of an array that meet a condition. It stops when it encounters the first element for which the condition function returns false.

```typescript
import { takeRightWhile } from 'es-toolkit/array';

// Take numbers less than 4 from the end
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);
// Result: [3, 2, 1]

// Take numbers greater than 3 from the end
takeRightWhile([1, 2, 3], n => n > 3);
// Result: []

// Take elements with string length <= 5
takeRightWhile(['hello', 'world', 'foo', 'bar'], str => str.length <= 5);
// Result: ['hello', 'world', 'foo', 'bar']
```

#### Parameters

- `arr` (`T[]`): The array to take elements from.
- `shouldContinueTaking` (`(item: T) => boolean`): A condition function called with each element. Elements are included in the result as long as this function returns true.

#### Returns

(`T[]`): A new array containing the elements taken from the end while the condition function returns true.
