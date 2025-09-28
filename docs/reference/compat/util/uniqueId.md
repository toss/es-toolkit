# uniqueId (Lodash Compatibility)

::: warning Recommend using crypto.randomUUID

When generating unique identifiers, using crypto.randomUUID() is a safer and more standard approach.

Use the faster and more modern crypto.randomUUID() instead.

:::

Generates a unique string identifier.

```typescript
const result = uniqueId('contact_');
```

## Reference

### `uniqueId(prefix?: string): string`

Generates a unique string identifier. Guarantees uniqueness by incrementing an internal counter.

```typescript
import { uniqueId } from 'es-toolkit/compat';

// Generate unique ID with prefix
uniqueId('contact_'); // => 'contact_1'
uniqueId('user_'); // => 'user_2'

// Generate unique ID without prefix
uniqueId(); // => '3'
uniqueId(); // => '4'
```

The internal counter increments with each successive call.

```typescript
import { uniqueId } from 'es-toolkit/compat';

// Generate different IDs with each call
const ids = Array.from({ length: 5 }, () => uniqueId('item_'));
console.log(ids);
// => ['item_1', 'item_2', 'item_3', 'item_4', 'item_5']
```

Useful for generating unique IDs for DOM elements.

```typescript
import { uniqueId } from 'es-toolkit/compat';

// Generate unique IDs for form elements
const inputId = uniqueId('input_');
const labelId = uniqueId('label_');

console.log(inputId); // => 'input_6'
console.log(labelId); // => 'label_7'
```

#### Parameters

- `prefix` (`string`, optional): The prefix string to prepend to the ID. If not provided, returns only the number.

#### Returns

(`string`): A unique identifier string. If a prefix is provided, returns in the format `prefix + number`, otherwise just the number.
