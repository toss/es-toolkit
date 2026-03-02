# stubString (Lodash Compatibility)

::: warning Use `''` directly instead

This `stubString` function is a simple wrapper that returns an empty string and represents unnecessary abstraction.

Use the faster and more direct `''` instead.

:::

Always returns an empty string.

```typescript
const emptyString = stubString();
```

## Usage

### `stubString()`

A function that always returns an empty string. Use this when you need an empty string as a default value or when you need consistent return values in functional programming.

```typescript
import { stubString } from 'es-toolkit/compat';

// Returns an empty string
const emptyString = stubString();
console.log(emptyString); // => ''

// Use as default value
function formatMessage(message = stubString()) {
  return message || 'Default message';
}

console.log(formatMessage()); // => 'Default message'
console.log(formatMessage('Hello')); // => 'Hello'

// Use in functional programming
const createEmpty = () => stubString();
const str = createEmpty();
console.log(str.length); // => 0
```

Returns the same empty string every time.

```typescript
import { stubString } from 'es-toolkit/compat';

const str1 = stubString();
const str2 = stubString();

console.log(str1 === str2); // => true
console.log(typeof str1); // => 'string'
console.log(str1.length); // => 0
```

#### Parameters

None.

#### Returns

(`string`): Always returns an empty string.
