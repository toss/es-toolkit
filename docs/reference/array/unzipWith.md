# unzipWith

Unpacks grouped arrays and applies a transformation function to return a new array.

```typescript
const transformedArray = unzipWith(target, iteratee);
```

## Reference

### `unzipWith(target, iteratee)`

Use `unzipWith` when you want to collect elements at the same position from a 2D array where multiple arrays are grouped together and apply a transformation function to get the result. It's similar to `unzip` but allows you to transform the elements in each group with a custom function.

```typescript
import { unzipWith } from 'es-toolkit/array';

// Add numbers at the same position.
const numbers = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const sums = unzipWith(numbers, (a, b, c) => a + b + c);
console.log(sums); // [9, 12] (1+3+5=9, 2+4+6=12)

// Concatenate strings at the same position.
const words = [
  ['hello', 'world'],
  ['foo', 'bar'],
  ['es', 'toolkit'],
];
const combined = unzipWith(words, (a, b, c) => a + b + c);
console.log(combined); // ['hellofooes', 'worldbartoolkit']

// Calculate average of specific property from object array.
const scores = [
  [{ score: 80 }, { score: 90 }],
  [{ score: 85 }, { score: 95 }],
  [{ score: 75 }, { score: 88 }],
];
const averages = unzipWith(scores, (a, b, c) => (a.score + b.score + c.score) / 3);
console.log(averages); // [80, 91] (80+85+75)/3, (90+95+88)/3
```

If arrays have different lengths, undefined is passed.

```typescript
import { unzipWith } from 'es-toolkit/array';

const mixed = [
  [1, 4],
  [2, 5],
  [3], // Different length
];
const result = unzipWith(mixed, (a, b, c) => {
  // c can be undefined
  return (a || 0) + (b || 0) + (c || 0);
});
console.log(result); // [6, 9] (1+2+3, 4+5+0)
```

Passing an empty array returns an empty array.

```typescript
import { unzipWith } from 'es-toolkit/array';

const empty = unzipWith([], (a, b) => a + b);
console.log(empty); // []
```

#### Parameters

- `target` (`readonly T[][]`): A 2D array where multiple arrays are grouped together to be unpacked and transformed.
- `iteratee` (`(...args: T[]) => R`): A function that receives elements at the same position and transforms them into a new value.

#### Returns

(`R[]`): A new array created by applying the transformation function to the results.
