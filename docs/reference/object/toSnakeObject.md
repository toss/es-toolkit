# toSnakeObject

Converts the keys of an object to snake_case.

This function does not mutate the original object.

## Interface

```typescript
function toSnakeObject<T extends Record<PropertyKey, any>>(obj: T): Record<string, any>;
```

### Parameters

- `obj` (`T`): The object whose keys will be converted to snake_case.

### Return Value

(`Record<string, any>`): A new object with keys converted to snake_case.

## Example

```typescript
const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
// Output: {
//   first_name: 'Gweesin',
//   last_name: 'Chan',
//   contact_info: {
//     email_address: 'john@example.com',
//     phone_number: '123-456-7890'
//   }
// }
```

## Description

The `toSnakeObject` function recursively converts all keys of an object and its nested objects to snake_case. It is applicable to objects with any depth of nesting and does not alter the original object.

## Demo

::: sandpack

```ts index.ts
import { toSnakeObject } from 'es-toolkit';

const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
```

:::