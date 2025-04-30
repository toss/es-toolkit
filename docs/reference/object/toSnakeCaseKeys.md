# toSnakeCaseKeys

Creates a new object composed of the properties with keys converted to snake case (`snake_case`).

This function takes an object and returns a new object that includes the same properties,
but with all keys converted to snake case format.

## Signature

```typescript
function toSnakeCaseKeys<T>(obj: T): ToSnakeCaseKeys<T>;
```

### Parameters

- `obj` (`T`): The object to convert keys from.

### Returns

(`ToSnakeCaseKeys<T>`): A new object with all keys converted to snake case.

## Examples

```typescript
// Example with objects
const obj = { userId: 1, firstName: 'John' };
const result = toSnakeCaseKeys(obj);
// result will be { user_id: 1, first_name: 'John' }

// Example with arrays of objects
const arr = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const arrResult = toSnakeCaseKeys(arr);
// arrResult will be [{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]

// Example with nested objects
const nested = {
  userData: {
    userId: 1,
    userAddress: {
      streetName: 'Main St',
      zipCode: '12345',
    },
  },
};
const nestedResult = toSnakeCaseKeys(nested);
// nestedResult will be:
// {
//   user_data: {
//     user_id: 1,
//     user_address: {
//       street_name: 'Main St',
//       zip_code: '12345'
//     }
//   }
// }
```
