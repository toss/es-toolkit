# isNil

Checks if a value is `null` or `undefined`.

```typescript
const result = isNil(value);
```

## Usage

### `isNil(value)`

Use `isNil` when you want to check if a value is `null` or `undefined`.

```typescript
import { isNil } from 'es-toolkit/predicate';

// null or undefined values
console.log(isNil(null)); // true
console.log(isNil(undefined)); // true

// Other values
console.log(isNil(0)); // false
console.log(isNil('')); // false
console.log(isNil(false)); // false
console.log(isNil([])); // false
console.log(isNil({})); // false
```

It can also be used as a type guard in TypeScript:

```typescript
function processValue(value: string | null | undefined) {
  if (isNil(value)) {
    // value is now narrowed to null | undefined
    console.log('Value is empty');
  } else {
    // value is narrowed to string
    console.log(value.toUpperCase());
  }
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's `null` or `undefined`.

#### Returns

(`value is null | undefined`): Returns `true` if the value is `null` or `undefined`, `false` otherwise.
