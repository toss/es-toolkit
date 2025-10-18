# countBy

Categorizes the elements of an array based on a transformation function result and returns an object with counts.

```typescript
const counted = countBy(arr, mapper);
```

## Reference

### `countBy(arr, mapper)`

Use `countBy` when you want to categorize array elements by a specific criterion and count each group. It groups elements using the value returned by the transformation function as a key and calculates the number of elements in each group.

```typescript
import { countBy } from 'es-toolkit/array';

// Count numbers by odd/even categorization.
countBy([1, 2, 3, 4, 5], item => (item % 2 === 0 ? 'even' : 'odd'));
// Returns: { odd: 3, even: 2 }
```

You can also count based on a specific property of an object array.

```typescript
import { countBy } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 30 },
];

countBy(users, user => user.age);
// Returns: { '25': 2, '30': 2 }
```

#### Parameters

- `arr` (`T[]`): The array to count elements from.
- `mapper` (`(item: T) => K`): A function that returns the value to use as the categorization criterion.

#### Returns

(`Record<K, number>`): An object representing how many elements exist for each categorization criterion.
