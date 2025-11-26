# isNull

Checks if a value is `null`.

```typescript
const result = isNull(value);
```

## Usage

### `isNull(value)`

Use `isNull` when you want to check if a value is exactly `null`. It uses strict equality (`===`) to recognize only `null` and not undefined.

```typescript
import { isNull } from 'es-toolkit/predicate';

// null value
console.log(isNull(null)); // true

// Non-null values
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull('')); // false
console.log(isNull(false)); // false
console.log(isNull([])); // false
console.log(isNull({})); // false
```

It can also be used as a type guard in TypeScript.

```typescript
function processValue(value: string | null | undefined) {
  if (isNull(value)) {
    // value is now narrowed to null
    console.log('Value is null');
  } else {
    // value is narrowed to string | undefined
    console.log('Value is not null:', value);
  }
}
```

`isNull` is different from [`isNil`](./isNil.md) in that it treats `undefined` as `false`.

```typescript
import { isNil, isNull } from 'es-toolkit/predicate';

console.log(isNull(undefined)); // false
console.log(isNil(undefined)); // true
```

#### Parameters

- `value` (`unknown`): The value to check if it's `null`.

#### Returns

(`boolean`): Returns `true` if the value is `null`, `false` otherwise.
