# toPascalCaseKeys

Returns a new object with all keys in objects and arrays converted to PascalCase.

Pascal case is a naming convention where each word in an identifier is capitalized and concatenated. For example, it's written as `PascalCase`.

```typescript
const pascalCased = toPascalCaseKeys(obj);
```

## Usage

### `toPascalCaseKeys(obj)`

Use `toPascalCaseKeys` when you want to convert all keys of an object to pascal case. Nested objects and objects within arrays are also converted recursively.

For example, object keys are converted as follows:

- `snake_case` → `PascalCase` (e.g. `user_id` → `UserId`)
- `camelCase` → `PascalCase` (e.g. `UserId` → `UserId`)
- `UPPERCASE_KEYS` → `PascalCase` (e.g. `FIRST_NAME` → `FirstName`, `LAST` → `Last`)

```typescript
import { toPascalCaseKeys } from 'es-toolkit/object';

// Basic object conversion
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toPascalCaseKeys(obj);
// result is { UserId: 1, FirstName: 'John', LastName: 'Doe' }

// Objects within arrays are also converted
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toPascalCaseKeys(users);
// convertedUsers is [{ UserId: 1, FirstName: 'John' }, { UserId: 2, FirstName: 'Jane' }]

// Nested objects are fully converted
const nested = {
  user_data: {
    user_id: 1,
    contact_info: {
      email_address: 'john@example.com',
      phone_number: '123-456-7890',
    },
  },
};
const nestedResult = toPascalCaseKeys(nested);
// nestedResult is {
//   UserData: {
//     UserId: 1,
//     ContactInfo: {
//       EmailAddress: 'john@example.com',
//       PhoneNumber: '123-456-7890'
//     }
//   }
// }

// camelCase and uppercase keys are also converted
const raw = { userId: 1, FIRST_NAME: 'JinHo', LAST: 'Yeom' };
const converted = toPascalCaseKeys(raw);
// converted is { UserId: 1, FirstName: 'JinHo', Last: 'Yeom' }
```

#### Parameters

- `obj` (`T`): The object, array, or primitive value to convert keys to PascalCase.

#### Returns

(`ToPascalCaseKeys<T>`): Returns a new object with all keys converted to PascalCase.
