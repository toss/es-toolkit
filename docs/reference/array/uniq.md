# uniq

Returns a new array with duplicate elements removed.

```typescript
const uniqueArray = uniq(arr);
```

## Reference

### `uniq(arr)`

Use `uniq` when you want to remove duplicate values from an array and keep only unique values. It preserves the order in which they first appear in the original array.

```typescript
import { uniq } from 'es-toolkit/array';

// Remove duplicates from a number array.
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// Remove duplicates from a string array.
const words = ['apple', 'banana', 'apple', 'cherry', 'banana'];
const uniqueWords = uniq(words);
console.log(uniqueWords); // ['apple', 'banana', 'cherry']

// Remove objects with the same reference from an object array.
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj1, obj3, obj2];
const uniqueObjects = uniq(objects);
console.log(uniqueObjects); // [{ id: 1 }, { id: 2 }, { id: 3 }]
```

It returns an empty array for an empty array.

```typescript
import { uniq } from 'es-toolkit/array';

const emptyArray = uniq([]);
console.log(emptyArray); // []
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to remove duplicates.

#### Returns

(`T[]`): A new array with duplicates removed. Preserves the order in which they first appear in the original array.
