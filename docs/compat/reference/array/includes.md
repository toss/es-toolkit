# includes (Lodash Compatibility)

::: warning Use `Array.prototype.includes`

This `includes` function operates slowly due to object iteration and SameValueZero comparison processing. For arrays, JavaScript's native `Array.prototype.includes` method is faster and more standardized.

Instead, use the faster and more modern `Array.prototype.includes`.

:::

Checks if a specific value is included in an array, object, or string.

```typescript
const hasValue = includes(collection, target, fromIndex);
```

## Usage

### `includes(collection, target, fromIndex)`

Use `includes` when you want to check if a specific value exists in an array, object, or string. It compares values using the SameValueZero method.

```typescript
import { includes } from 'es-toolkit/compat';

// Find value in array
includes([1, 2, 3], 2);
// Returns: true

// Find in object values
includes({ a: 1, b: 'a', c: NaN }, 'a');
// Returns: true

// Find substring in string
includes('hello world', 'world');
// Returns: true
```

You can start searching from a specific index.

```typescript
import { includes } from 'es-toolkit/compat';

// Search from index 2
includes([1, 2, 3, 2], 2, 2);
// Returns: true (found at index 3)

// Negative index counts from the end
includes([1, 2, 3], 2, -2);
// Returns: true
```

`null` or `undefined` always return `false`.

```typescript
import { includes } from 'es-toolkit/compat';

includes(null, 1); // false
includes(undefined, 1); // false
```

You can also search for substrings in strings.

```typescript
import { includes } from 'es-toolkit/compat';

// Search from beginning
includes('hello', 'e');
// Returns: true

// Search from specific position
includes('hello', 'e', 2);
// Returns: false (no 'e' after index 2)
```

It can correctly find `NaN` values.

```typescript
import { includes } from 'es-toolkit/compat';

includes([1, 2, NaN], NaN);
// Returns: true

includes({ a: 1, b: NaN }, NaN);
// Returns: true
```

#### Parameters

- `collection` (`Array | Record<string, any> | string | null | undefined`): The array, object, or string to search.
- `target` (`any`): The value to find.
- `fromIndex` (`number`, optional): The index to start searching from. Negative values count from the end. Default is `0`.

#### Returns

(`boolean`): Returns `true` if the value exists, `false` otherwise.
