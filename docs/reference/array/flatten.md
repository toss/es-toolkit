# flatten

Returns a new array that is flattened to the specified depth.

```typescript
const result = flatten(arr, depth);
```

## Usage

### `flatten(arr, depth = 1)`

Use `flatten` when you want to flatten a nested array to a specific depth. It unwinds arrays within arrays to the specified level, creating a flatter structure.

It works identically to the [Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) included in the JavaScript language, but it's faster.

```typescript
import { flatten } from 'es-toolkit/array';

// Flatten with default depth of 1
const array = [1, [2, 3], [4, [5, 6]]];
flatten(array);
// Returns: [1, 2, 3, 4, [5, 6]]

// Flatten with depth of 2
flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

You can control the depth to flatten only to the desired level.

```typescript
import { flatten } from 'es-toolkit/array';

const array = [1, [2, 3], [4, [5, 6]]];

// Flatten with depth of 1 (default)
const result1 = flatten(array, 1);
// Returns: [1, 2, 3, 4, [5, 6]]

// Flatten with depth of 2
const result2 = flatten(array, 2);
// Returns: [1, 2, 3, 4, 5, 6]
```

#### Parameters

- `arr` (`T[]`): The nested array to flatten.
- `depth` (`D`, optional): The depth to flatten. Defaults to `1`.

#### Returns

(`Array<FlatArray<T[], D>>`): Returns a new array flattened to the specified depth.
