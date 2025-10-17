# minBy

Returns the element with the minimum value from the array based on the value returned by the transformation function.

```typescript
const min = minBy(items, getValue);
```

## Reference

### `minBy(items, getValue)`

Use `minBy` when you want to transform elements in an array to numeric values using a transformation function and find the original element with the smallest value. It returns `undefined` for an empty array.

```typescript
import { minBy } from 'es-toolkit/array';

// Find the element with the minimum value for a specific property in an object array.
const people = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 28 },
  { name: 'joe', age: 26 },
];
minBy(people, person => person.age);
// Returns: { name: 'joe', age: 26 }

// Find the element with the smallest absolute value in a number array.
const numbers = [-10, -5, 0, 5, 15];
minBy(numbers, x => Math.abs(x));
// Returns: 0
```

It returns `undefined` for an empty array.

```typescript
import { minBy } from 'es-toolkit/array';

minBy([], x => x.value); // undefined
```

#### Parameters

- `items` (`T[]`): The array to find the element with the minimum value.
- `getValue` (`(element: T) => number`): A function that transforms each element into a number.

#### Returns

(`T | undefined`): The element with the smallest value returned by the transformation function. Returns `undefined` if the array is empty.
