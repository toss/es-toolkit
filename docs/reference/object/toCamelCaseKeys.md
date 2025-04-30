# toCamelCaseKeys

Creates a new object composed of the properties with keys converted to camel case (`camelCase`).

This function takes an object and returns a new object that includes the same properties,
but with all keys converted to camel case format.

## Signature

```typescript
function toCamelCaseKeys<T>(obj: T): ToCamelCaseKeys<T>;
```

### Parameters

- `obj` (`T`): The object to convert keys from.

### Returns

(`ToCamelCaseKeys<T>`): A new object with all keys converted to camel case.

## Examples

```typescript
// Example with objects
const obj = { user_id: 1, first_name: 'John' };
const result = toCamelCaseKeys(obj);
// result will be { userId: 1, firstName: 'John' }

// Example with arrays of objects
const arr = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const arrResult = toCamelCaseKeys(arr);
// arrResult will be [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]

// Example with nested objects
const nested = {
  user_data: {
    user_id: 1,
    user_address: {
      street_name: 'Main St',
      zip_code: '12345',
    },
  },
};
const nestedResult = toCamelCaseKeys(nested);
// nestedResult will be:
// {
//   userData: {
//     userId: 1,
//     userAddress: {
//       streetName: 'Main St',
//       zipCode: '12345'
//     }
//   }
// }
```
