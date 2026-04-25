# pull (Lodash compatibility)

::: warning Use [pull](../../array/pull.md) from `es-toolkit`

This `pull` function is for Lodash compatibility and operates slower due to more complex type handling and overloading.

Instead, use the faster and more modern [pull](../../array/pull.md) from `es-toolkit`.

:::

Removes all specified values from the array.

```typescript
const result = pull(array, ...valuesToRemove);
```

## Usage

### `pull(array, ...valuesToRemove)`

Removes all specified values from the array and modifies the original array. It directly modifies the original array without copying, which can save memory.

```typescript
import { pull } from 'es-toolkit/compat';

// Remove specific values from number array
const numbers = [1, 2, 3, 2, 4, 2, 5];
pull(numbers, 2, 3);
console.log(numbers); // [1, 4, 5]

// Remove specific values from string array
const fruits = ['apple', 'banana', 'apple', 'cherry'];
pull(fruits, 'apple');
console.log(fruits); // ['banana', 'cherry']
```

#### Parameters

- `array` (`T[]`): The array to modify.
- `...valuesToRemove` (`T[]`): The values to remove from the array.

#### Returns

(`T[]`): Returns the modified original array.
