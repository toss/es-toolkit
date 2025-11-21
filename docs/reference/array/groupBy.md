# groupBy

Returns a new object with array elements grouped according to a key-generating function.

```typescript
const grouped = groupBy(arr, getKeyFromItem);
```

## Usage

### `groupBy(arr, getKeyFromItem)`

Use `groupBy` when you want to classify array elements based on specific criteria. Provide a function that generates a key from each element, and it groups elements with the same key together and returns them as an object. The values in the returned object are arrays of elements belonging to each group. This is useful for organizing data by category or performing group-based analysis.

```typescript
import { groupBy } from 'es-toolkit/array';

// Group an array of objects by category
const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

const result = groupBy(items, item => item.category);
// Result:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' }
//   ]
// }
```

You can group by various criteria.

```typescript
import { groupBy } from 'es-toolkit/array';

// Group by string length
const words = ['one', 'two', 'three', 'four', 'five'];
const byLength = groupBy(words, word => word.length);
// Result: { 3: ['one', 'two'], 4: ['four', 'five'], 5: ['three'] }

// Group by even/odd
const numbers = [1, 2, 3, 4, 5, 6];
const byParity = groupBy(numbers, num => (num % 2 === 0 ? 'even' : 'odd'));
// Result: { odd: [1, 3, 5], even: [2, 4, 6] }
```

#### Parameters

- `arr` (`T[]`): The array to group.
- `getKeyFromItem` (`(item: T) => K`): A function that generates a key from each element.

#### Returns

(`Record<K, T[]>`): Returns an object with elements grouped by key.
