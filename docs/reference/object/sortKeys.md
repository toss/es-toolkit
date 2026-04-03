# sortKeys

Creates a new object with the keys sorted.

```typescript
const sorted = sortKeys(object, compare?);
```

## Usage

### `sortKeys(object, compare?)`

Use `sortKeys` when you want to create a new object with its keys in a deterministic order. Keys are sorted alphabetically by default, which is useful for serialization, comparison, or display purposes.

```typescript
import { sortKeys } from 'es-toolkit/object';

const sorted = sortKeys({ c: 3, a: 1, b: 2 });
// { a: 1, b: 2, c: 3 }
```

You can also provide a custom compare function for different sorting behavior.

```typescript
// Sort in reverse alphabetical order
const reversed = sortKeys({ a: 1, b: 2, c: 3 }, (a, b) => b.localeCompare(a));
// { c: 3, b: 2, a: 1 }
```

Values are preserved as-is, including nested objects and arrays.

```typescript
const obj = { z: [1, 2], a: { nested: true }, m: 'hello' };
const sorted = sortKeys(obj);
// { a: { nested: true }, m: 'hello', z: [1, 2] }
```

#### Parameters

- `object` (`T`): The object to sort keys from.
- `compare` (`(a: string, b: string) => number`, optional): A custom compare function for sorting keys. Defaults to alphabetical order.

#### Returns

(`T`): A new object with the keys sorted.
