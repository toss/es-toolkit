# toKebabCaseKeys

Returns a new object with all keys in objects and arrays converted to kebab-case.

Kebab case is a naming convention where each word is written in lowercase and connected with dashes (-). For example, it's written as `kebab-case`.

```typescript
const kebabCased = toKebabCaseKeys(obj);
```

## Usage

### `toKebabCaseKeys(obj)`

Use `toKebabCaseKeys` when you want to convert all keys of an object to kebab-case. Nested objects and objects within arrays are also converted recursively.

For example, object keys are converted as follows:

- `camelCase` → `kebab-case` (e.g. `userId` → `user-id`)
- `PascalCase` → `kebab-case` (e.g. `UserId` → `user-id`)
- `UPPERCASE_KEYS` → `kebab-case` (e.g. `FIRST_NAME` → `first-name`, `LAST` → `last`)

```typescript
import { toKebabCaseKeys } from 'es-toolkit/object';

// Basic object conversion
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toKebabCaseKeys(obj);
// result is { 'user-id': 1, 'first-name': 'John', 'last-name': 'Doe' }

// Objects within arrays are also converted
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toKebabCaseKeys(users);
// convertedUsers is [{ 'user-id': 1, 'first-name': 'John' }, { 'user-id': 2, 'first-name': 'Jane' }]

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
const nestedResult = toKebabCaseKeys(nested);
// nestedResult is {
//   'user-data': {
//     'user-id': 1,
//     'contact-info': {
//       'email-address': 'john@example.com',
//       'phone-number': '123-456-7890'
//     }
//   }
// }
```

#### Parameters

- `obj` (`T`): The object, array, or primitive value to convert keys to kebab-case.

#### Returns

(`ToKebabCaseKeys<T>`): Returns a new object with all keys converted to kebab-case.
