# maxBy

Returns the element with the maximum value from the array based on the value returned by the transformation function.

```typescript
const max = maxBy(items, getValue);
```

## Reference

### `maxBy(items, getValue)`

Use `maxBy` when you want to transform elements in an array to numeric values using a transformation function and find the original element with the largest value. It returns `undefined` for an empty array.

```typescript
import { maxBy } from 'es-toolkit/array';

// Find the element with the maximum value for a specific property in an object array.
const people = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 28 },
  { name: 'joe', age: 26 }
];
maxBy(people, person => person.age);
// Returns: { name: 'john', age: 30 }

// Find the element with the largest absolute value in a number array.
const numbers = [-10, -5, 0, 5, 15];
maxBy(numbers, x => Math.abs(x));
// Returns: 15
```

It returns `undefined` for an empty array.

```typescript
import { maxBy } from 'es-toolkit/array';

maxBy([], x => x.value); // undefined
```

#### Parameters

- `items` (`T[]`): The array to find the element with the maximum value.
- `getValue` (`(element: T) => number`): A function that transforms each element into a number.

#### Returns

(`T | undefined`): The element with the largest value returned by the transformation function. Returns `undefined` if the array is empty.
