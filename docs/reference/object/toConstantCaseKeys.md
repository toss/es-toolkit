# toConstantCaseKeys

Returns a new object with all keys in objects and arrays converted to CONSTANT_CASE.

Constant case is a naming convention where each word in an identifier is written in uppercase and connected with underscores (`_`). For example, it's written as `CONSTANT_CASE`.

```typescript
const constantCased = toConstantCaseKeys(obj);
```

## Usage

### `toConstantCaseKeys(obj)`

Use `toConstantCaseKeys` when you want to convert all keys of an object to CONSTANT_CASE. Nested objects and objects within arrays are also converted recursively.

For example, object keys are converted as follows:

- `camelCase` → `CONSTANT_CASE` (e.g. `userId` → `USER_ID`)
- `PascalCase` → `CONSTANT_CASE` (e.g. `UserId` → `USER_ID`)
- `snake_case` → `CONSTANT_CASE` (e.g. `first_name` → `FIRST_NAME`, `last` → `LAST`)

```typescript
import { toConstantCaseKeys } from 'es-toolkit/object';

// Basic object conversion
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toConstantCaseKeys(obj);
// result is { USER_ID: 1, FIRST_NAME: 'John', LAST_NAME: 'Doe' }

// Objects within arrays are also converted
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toConstantCaseKeys(users);
// convertedUsers is [{ USER_ID: 1, FIRST_NAME: 'John' }, { USER_ID: 2, FIRST_NAME: 'Jane' }]

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
const nestedResult = toConstantCaseKeys(nested);
// nestedResult is {
//   USER_DATA: {
//     USER_ID: 1,
//     CONTACT_INFO: {
//       EMAIL_ADDRESS: 'john@example.com',
//       PHONE_NUMBER: '123-456-7890'
//     }
//   }
// }
```

#### Parameters

- `obj` (`T`): The object, array, or primitive value to convert keys to CONSTANT_CASE.

#### Returns

(`ToConstantCaseKeys<T>`): Returns a new object with all keys converted to CONSTANT_CASE.
