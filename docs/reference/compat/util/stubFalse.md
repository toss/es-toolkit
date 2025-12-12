# stubFalse (Lodash Compatibility)

::: warning Use `false` directly instead

This `stubFalse` function is a simple wrapper that returns `false` and represents unnecessary abstraction.

Use the faster and more direct `false` value instead.

:::

Always returns `false`.

```typescript
const falseValue = stubFalse();
```

## Usage

### `stubFalse()`

A function that always returns `false`. This is useful when you need a consistent false value in functional programming or as a default value in conditional callbacks.

```typescript
import { stubFalse } from 'es-toolkit/compat';

// Returns false
const result = stubFalse();
console.log(result); // => false

// Use as default condition in array filtering
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(stubFalse); // Removes all elements
console.log(evenNumbers); // => []

// Use in functional programming
const isValid = condition => (condition ? someValidation : stubFalse);
const validator = isValid(false);
console.log(validator()); // => false
```

Returns the same `false` value every time.

```typescript
import { stubFalse } from 'es-toolkit/compat';

const result1 = stubFalse();
const result2 = stubFalse();

console.log(result1 === result2); // => true
console.log(typeof result1); // => 'boolean'
console.log(result1); // => false
```

#### Parameters

None.

#### Returns

(`false`): Always returns `false`.
