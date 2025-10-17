# identity (Lodash Compatibility)

::: warning Use `es-toolkit`'s `identity`
This `identity` function has the same functionality in the main `es-toolkit` library. It simply returns the input value as is.

Instead, use the faster and more modern `es-toolkit`'s [identity](../../function/identity.md).
:::

Returns the received value as is.

```typescript
const result = identity(value);
```

## Reference

### `identity(value)`

Use `identity` when you want to return the received value as is. It's mainly used as a default value or placeholder function, and is frequently used in functional programming.

```typescript
import { identity } from 'es-toolkit/compat';

// Basic usage
console.log(identity(5)); // 5
console.log(identity('hello')); // 'hello'
console.log(identity({ key: 'value' })); // { key: 'value' }

// Use with array's map (value copy)
const numbers = [1, 2, 3, 4, 5];
const copied = numbers.map(identity);
console.log(copied); // [1, 2, 3, 4, 5]

// Use as default value in filtering
const values = [1, 0, '', 'hello', null, undefined, false, true];
const filtered = values.filter(identity); // Keep only truthy values
console.log(filtered); // [1, 'hello', true]

// Use as default transformation function
function processData(data, transform = identity) {
  return transform(data);
}

console.log(processData('hello')); // 'hello'
console.log(processData('hello', x => x.toUpperCase())); // 'HELLO'
```

In most cases, it can be replaced with a simpler arrow function `x => x`:

```typescript
// Using arrow function instead of identity (recommended)
const copied = numbers.map(x => x);
const filtered = values.filter(x => x);
```

#### Parameters

- `value` (`T`): The value to return.

#### Returns

(`T`): Returns the received value as is.
