# pull

Removes all specified values from an array.

```typescript
const result = pull(arr, valuesToRemove);
```

## Usage

### `pull(arr, valuesToRemove)`

Use `pull` when you want to remove all occurrences of specific values from an array. This function modifies the original array directly and returns the modified array.

```typescript
import { pull } from 'es-toolkit/array';

// Remove specific values from a number array.
const numbers = [1, 2, 3, 4, 5, 2, 4];
pull(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]

// Remove specific strings from a string array.
const fruits = ['apple', 'banana', 'cherry', 'banana', 'date'];
pull(fruits, ['banana', 'cherry']);
console.log(fruits); // ['apple', 'date']

// Remove objects with the same reference from an object array.
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj3, obj1];
pull(objects, [obj1]);
console.log(objects); // [{ id: 2 }, { id: 3 }]
```

If you want to create a new array without modifying the original, use the `difference` function.

```typescript
import { pull } from 'es-toolkit/array';
import { difference } from 'es-toolkit/array';

const original = [1, 2, 3, 4, 5];

// pull modifies the original array.
const arr1 = [...original];
pull(arr1, [2, 4]);
console.log(arr1); // [1, 3, 5]

// difference returns a new array.
const arr2 = difference(original, [2, 4]);
console.log(original); // [1, 2, 3, 4, 5] (unchanged)
console.log(arr2); // [1, 3, 5]
```

#### Parameters

- `arr` (`T[]`): The array from which to remove values.
- `valuesToRemove` (`readonly unknown[]`): An array of values to remove from the array.

#### Returns

(`T[]`): The original array with the specified values removed. The original array is modified and returned.
