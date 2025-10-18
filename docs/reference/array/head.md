# head

Returns the first element of an array.

```typescript
const firstElement = head(arr);
```

## Reference

### `head(arr)`

Use `head` when you want to get the first element of an array. If the array is empty, it returns `undefined`. This is useful when accessing data at the beginning of an array.

```typescript
import { head } from 'es-toolkit/array';

// Get the first element of a number array
const numbers = [1, 2, 3, 4, 5];
head(numbers);
// Returns: 1

// Get the first element of a string array
const strings = ['a', 'b', 'c'];
head(strings);
// Returns: 'a'

// Empty array returns undefined
const emptyArray: number[] = [];
head(emptyArray);
// Returns: undefined
```

Type handling is safe.

```typescript
import { head } from 'es-toolkit/array';

// For non-empty arrays, the type is certain
const nonEmptyArray = [1, 2, 3] as const;
head(nonEmptyArray);
// Returns: 1 (type: 1)

// For regular arrays, undefined is possible
const maybeEmptyArray = [1, 2, 3];
head(maybeEmptyArray);
// Returns: 1 | undefined (type: number | undefined)
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to get the first element.

#### Returns

(`T | undefined`): The first element of the array. Returns `undefined` if the array is empty.
