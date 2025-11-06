# startCase (Lodash compatibility)

::: warning Use `startCase` from `es-toolkit`

This `startCase` function runs slower due to normalization logic for handling `null` or `undefined`.

Instead, use the faster and more modern [startCase](../../string/startCase.md) from `es-toolkit`.

:::

Converts a string to start case.

```typescript
const startCased = startCase(str);
```

## Usage

### `startCase(str)`

Use `startCase` when you want to convert a string to Start Case. Start Case is a naming convention where the first letter of each word is capitalized and separated by spaces.

```typescript
import { startCase } from 'es-toolkit/compat';

// Convert regular string
startCase('hello world');
// Returns: 'Hello World'

// Keep words that are already uppercase
startCase('HELLO WORLD');
// Returns: 'HELLO WORLD'

// Convert hyphen-separated string
startCase('hello-world');
// Returns: 'Hello World'

// Convert underscore-separated string
startCase('hello_world');
// Returns: 'Hello World'
```

`null` or `undefined` are treated as empty strings.

```typescript
import { startCase } from 'es-toolkit/compat';

startCase(null); // ''
startCase(undefined); // ''
```

#### Parameters

- `str` (`string`, optional): The string to convert to start case.

#### Returns

(`string`): Returns the start case converted string.
