# times (Lodash Compatibility)

Executes a function the given number of times and returns the results as an array.

```typescript
const result = times(n, iteratee);
```

## Usage

### `times(n, iteratee)`

Executes the iteratee function the given number of times and returns the results as an array. The current index is passed to the function in each iteration.

```typescript
import { times } from 'es-toolkit/compat';

// Array of indices from 0 to 2 multiplied by 2
times(3, i => i * 2);
// Returns: [0, 2, 4]

// Generate the same value multiple times
times(2, () => 'es-toolkit');
// Returns: ['es-toolkit', 'es-toolkit']
```

If no function is provided, it returns an array of indices.

```typescript
import { times } from 'es-toolkit/compat';

times(3);
// Returns: [0, 1, 2]
```

#### Parameters

- `n` (`number`): The number of times to iterate. Converted to an integer. Returns an empty array if less than 1 or not a safe integer.
- `iteratee` (`(num: number) => T`, optional): The function to execute for each iteration. Receives the index as an argument. If not provided, returns the index as is.

#### Returns

(`T[]`): Returns an array of results from executing the function in each iteration.
