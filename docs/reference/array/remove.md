# remove

Removes elements from an array based on a condition function and returns the removed elements in a new array. It modifies the original array directly.

```typescript
const removed = remove(arr, shouldRemoveElement);
```

## Reference

### `remove(arr, shouldRemoveElement)`

Use `remove` when you want to remove elements that meet a specific condition from an array and check what elements were removed. This function modifies the original array while returning the removed elements in a separate array. If you want to keep the original array, use the `filter` method.

```typescript
import { remove } from 'es-toolkit/array';

// Remove even numbers.
const numbers = [1, 2, 3, 4, 5];
const removedNumbers = remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5] (original array is modified)
console.log(removedNumbers); // [2, 4] (removed elements)

// Remove objects that meet a specific condition.
const users = [
  { name: 'john', age: 25 },
  { name: 'jane', age: 17 },
  { name: 'bob', age: 30 }
];
const minors = remove(users, user => user.age < 18);
console.log(users); // [{ name: 'john', age: 25 }, { name: 'bob', age: 30 }]
console.log(minors); // [{ name: 'jane', age: 17 }]
```

You can also use index and original array information.

```typescript
import { remove } from 'es-toolkit/array';

// Remove elements based on index.
const items = ['a', 'b', 'c', 'd', 'e'];
const removedAtEvenIndex = remove(items, (value, index) => index % 2 === 0);
console.log(items); // ['b', 'd']
console.log(removedAtEvenIndex); // ['a', 'c', 'e']
```

#### Parameters

- `arr` (`T[]`): The array to modify.
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): A condition function called for each element. Elements for which it returns `true` are removed.
  - `value`: The element currently being processed.
  - `index`: The index of the current element.
  - `array`: The original array.

#### Returns

(`T[]`): Returns a new array containing the removed elements.
