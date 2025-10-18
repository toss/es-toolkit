# words (Lodash Compatibility)

::: warning Use `words` from `es-toolkit`

This `words` function operates slowly due to handling `null` or `undefined` and complex Unicode support.

Use the faster and more modern [words](../../string/words.md) from `es-toolkit` instead.

:::

Splits a string into an array of words.

```typescript
const wordArray = words(str, pattern);
```

## Reference

### `words(str, pattern)`

Use `words` when you want to split a string into words. By default, it recognizes English letters, numbers, emojis, etc., to extract words.

```typescript
import { words } from 'es-toolkit/compat';

// Basic word extraction
words('fred, barney, & pebbles');
// Returns: ['fred', 'barney', 'pebbles']

// Extract words from camel case
words('camelCaseWord');
// Returns: ['camel', 'Case', 'Word']

// String with numbers
words('hello123world');
// Returns: ['hello', '123', 'world']
```

You can also extract words using a custom pattern.

```typescript
import { words } from 'es-toolkit/compat';

// Extract words using regex
words('hello world', /\w+/g);
// Returns: ['hello', 'world']

// Use string pattern
words('one-two-three', '-');
// Returns: ['-', '-']
```

`null` or `undefined` is treated as an empty array.

```typescript
import { words } from 'es-toolkit/compat';

words(null); // []
words(undefined); // []
```

#### Parameters

- `str` (`string`, optional): The string to split into words.
- `pattern` (`RegExp | string`, optional): The pattern to match words. Defaults to a built-in Unicode word pattern.

#### Returns

(`string[]`): Returns an array of extracted words.
