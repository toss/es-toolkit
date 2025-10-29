# repeat (Lodash compatibility)

::: warning Use JavaScript's `String.prototype.repeat`

This `repeat` function operates slower due to handling non-string values and integer conversion.

Instead, use the faster and more modern JavaScript's `String.prototype.repeat`.

:::

Repeats a string a specified number of times.

```typescript
const repeated = repeat(str, n);
```

## Reference

### `repeat(str, n?)`

Use `repeat` when you want to repeat a string multiple times to create a new string. If the repeat count is less than 1, it returns an empty string.

```typescript
import { repeat } from 'es-toolkit/compat';

// Repeat string
repeat('abc', 2);
// Returns: 'abcabc'

repeat('hello', 3);
// Returns: 'hellohellohello'

// Repeating 0 times returns empty string
repeat('abc', 0);
// Returns: ''
```

`null` or `undefined` are treated as empty strings.

```typescript
import { repeat } from 'es-toolkit/compat';

repeat(null, 3);
// Returns: ''

repeat(undefined, 2);
// Returns: ''
```

If you don't specify the repeat count, it repeats once.

```typescript
import { repeat } from 'es-toolkit/compat';

repeat('abc');
// Returns: 'abc'
```

#### Parameters

- `str` (`string`, optional): The string to repeat.
- `n` (`number`, optional): The number of times to repeat. Defaults to `1`.

#### Returns

(`string`): Returns the string repeated the specified number of times.
