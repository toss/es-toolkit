# toCamelCaseKeys

Returns a new object with all keys in objects and arrays converted to camelCase.

Camel case is a naming convention where the first word is lowercase and the first letter of subsequent words is capitalized and concatenated. For example, it's written as `camelCase`.

```typescript
const camelCased = toCamelCaseKeys(obj);
```

## Usage

### `toCamelCaseKeys(obj)`

Use `toCamelCaseKeys` when you want to convert all keys of an object to camel case. Nested objects and objects within arrays are also converted recursively.

```typescript
import { toCamelCaseKeys } from 'es-toolkit/object';

// Basic object conversion
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toCamelCaseKeys(obj);
// result is { userId: 1, firstName: 'John', lastName: 'Doe' }

// Objects within arrays are also converted
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toCamelCaseKeys(users);
// convertedUsers is [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]

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
const nestedResult = toCamelCaseKeys(nested);
// nestedResult is {
//   userData: {
//     userId: 1,
//     contactInfo: {
//       emailAddress: 'john@example.com',
//       phoneNumber: '123-456-7890'
//     }
//   }
// }
```

#### Parameters

- `obj` (`T`): The object, array, or primitive value to convert keys to camelCase.

#### Returns

(`ToCamelCaseKeys<T>`): Returns a new object with all keys converted to camelCase.
