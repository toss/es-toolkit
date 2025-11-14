# pullAll (Lodash compatibility)

Removes all values from the array that are contained in the array of specified values.

```typescript
const result = pullAll(array, valuesToRemove);
```

## Usage

### `pullAll(array, valuesToRemove)`

Removes all values contained in the `valuesToRemove` array from the array and modifies the original array. Similar to the `pull` function, but accepts values to remove as an array.

```typescript
import { pullAll } from 'es-toolkit/compat';

// Remove specific values from number array
const numbers = [1, 2, 3, 2, 4, 2, 5];
pullAll(numbers, [2, 3]);
console.log(numbers); // [1, 4, 5]

// Remove specific values from string array
const fruits = ['apple', 'banana', 'apple', 'cherry', 'banana'];
pullAll(fruits, ['apple', 'banana']);
console.log(fruits); // ['cherry']
```

If you pass an empty array, `null`, or `undefined`, nothing will be removed.

```typescript
import { pullAll } from 'es-toolkit/compat';

const numbers = [1, 2, 3];
pullAll(numbers, []);
console.log(numbers); // [1, 2, 3]

pullAll(numbers, null);
console.log(numbers); // [1, 2, 3]
```

#### Parameters

- `array` (`T[]`): The array to modify.
- `valuesToRemove` (`ArrayLike<T>`, optional): The array containing values to remove from the array. Defaults to `[]`.

#### Returns

(`T[]`): Returns the modified original array.
