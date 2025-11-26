# isDate

Checks if a value is a Date object.

```typescript
const result = isDate(value);
```

## Usage

### `isDate(value)`

Use `isDate` when you want to check if a value is a date object. Useful for distinguishing Date objects from string or number representations of dates. It acts as a type guard in TypeScript, narrowing the value's type to `Date`.

```typescript
import { isDate } from 'es-toolkit/predicate';

// Checking Date objects
const date = new Date();
isDate(date); // true

// Distinguishing from other types
isDate('2024-01-01'); // false - string
isDate(1640995200000); // false - timestamp
isDate({}); // false
```

Particularly useful when used as a type guard in TypeScript.

```typescript
import { isDate } from 'es-toolkit/predicate';

function formatDate(value: unknown): string {
  if (isDate(value)) {
    // value is narrowed to Date
    return value.toISOString();
  }
  return 'Invalid date';
}
```

Can be used for processing API responses or validating user input.

```typescript
import { isDate } from 'es-toolkit/predicate';

// Processing API response
function processResponse(response: { createdAt: unknown }) {
  if (isDate(response.createdAt)) {
    console.log(`Created at: ${response.createdAt.toLocaleDateString()}`);
  }
}

// Validating date
function validateBirthDate(value: unknown): boolean {
  if (isDate(value)) {
    const now = new Date();
    const minAge = new Date(now.getFullYear() - 150, now.getMonth(), now.getDate());

    return value <= now && value >= minAge;
  }
  return false;
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a Date object.

#### Returns

(`value is Date`): Returns `true` if the value is a Date object, `false` otherwise.
