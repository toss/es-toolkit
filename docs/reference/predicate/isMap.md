# isMap

Checks if a value is a Map.

```typescript
const result = isMap(value);
```

## Usage

### `isMap(value)`

Use `isMap` when you want to check if a value is a Map instance. It uses the `instanceof` operator to check if it's a `Map`.

```typescript
import { isMap } from 'es-toolkit/predicate';

// Map instance
const map = new Map([['key', 'value']]);
console.log(isMap(map)); // true

// Non-Map values
console.log(isMap(new Set())); // false
console.log(isMap(new WeakMap())); // false
console.log(isMap({})); // false
console.log(isMap([])); // false
console.log(isMap(null)); // false
```

It can also be used as a type guard in TypeScript.

```typescript
function processValue(value: unknown) {
  if (isMap(value)) {
    // Now value is narrowed to Map<any, any> type
    console.log(value.size);
    value.set('new-key', 'new-value');
  }
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a `Map`.

#### Returns

(`value is Map<any, any>`): Returns `true` if the value is a Map, `false` otherwise.
