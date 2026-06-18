# toSnakeCaseKeys

Returns a new object with all keys in objects and arrays converted to snake_case.

Snake case is a naming convention where each word in an identifier is written in lowercase and connected with underscores (`_`). For example, it's written as `snake_case`.

```typescript
const snakeCased = toSnakeCaseKeys(obj);
```

## Usage

### `toSnakeCaseKeys(obj)`

Use `toSnakeCaseKeys` when you want to convert all keys of an object to snake_case. Nested objects and objects within arrays are also converted recursively.

For example, object keys are converted as follows:

- `camelCase` → `snake_case` (e.g. `userId` → `user_id`)
- `PascalCase` → `snake_case` (e.g. `UserId` → `user_id`)
- `UPPERCASE_KEYS` → `snake_case` (e.g. `FIRST_NAME` → `first_name`, `LAST` → `last`)

```typescript
import { toSnakeCaseKeys } from 'es-toolkit/object';

// Basic object conversion
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toSnakeCaseKeys(obj);
// result is { user_id: 1, first_name: 'John', last_name: 'Doe' }

// Objects within arrays are also converted
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toSnakeCaseKeys(users);
// convertedUsers is [{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]

// Nested objects are fully converted
const nested = {
  userData: {
    userId: 1,
    contactInfo: {
      emailAddress: 'john@example.com',
      phoneNumber: '123-456-7890',
    },
  },
};
const nestedResult = toSnakeCaseKeys(nested);
// nestedResult is {
//   user_data: {
//     user_id: 1,
//     contact_info: {
//       email_address: 'john@example.com',
//       phone_number: '123-456-7890'
//     }
//   }
// }
```

#### Parameters

- `obj` (`T`): The object, array, or primitive value to convert keys to snake_case.

#### Returns

(`ToSnakeCaseKeys<T>`): Returns a new object with all keys converted to snake_case.
