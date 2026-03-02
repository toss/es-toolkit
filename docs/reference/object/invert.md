# invert

Creates a new object with keys and values swapped.

```typescript
const inverted = invert(obj);
```

## Usage

### `invert(obj)`

Use `invert` when you want to create a new object with keys and values swapped. The keys of the original object become the values of the new object, and the values of the original object become the keys of the new object. If there are duplicate values, the key that appears later will be used.

```typescript
import { invert } from 'es-toolkit/object';

// Basic usage
const original = { a: 1, b: 2, c: 3 };
const inverted = invert(original);
console.log(inverted); // { 1: 'a', 2: 'b', 3: 'c' }

// When there are duplicate values
const withDuplicates = { a: 1, b: 1, c: 2 };
const result = invert(withDuplicates);
console.log(result); // { 1: 'b', 2: 'c' } (later appearing 'b' is used as the value for key 1)

// String keys and number values
const grades = { alice: 85, bob: 92, charlie: 88 };
const invertedGrades = invert(grades);
console.log(invertedGrades); // { 85: 'alice', 92: 'bob', 88: 'charlie' }
```

Can be used with various types of keys and values.

```typescript
// Number keys and string values
const statusCodes = { 200: 'OK', 404: 'Not Found', 500: 'Internal Server Error' };
const invertedCodes = invert(statusCodes);
console.log(invertedCodes);
// { 'OK': '200', 'Not Found': '404', 'Internal Server Error': '500' }

// Useful when reverse lookup is needed
const userRoles = { admin: 'administrator', user: 'regular_user', guest: 'visitor' };
const roleToKey = invert(userRoles);
console.log(roleToKey);
// { 'administrator': 'admin', 'regular_user': 'user', 'visitor': 'guest' }

// Now you can find keys by values
function findRoleKey(roleName: string) {
  return roleToKey[roleName];
}
console.log(findRoleKey('administrator')); // 'admin'
```

Useful when used with enums or constant objects.

```typescript
// Color code mapping
const colorCodes = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
};

const codeToColor = invert(colorCodes);
console.log(codeToColor);
// { '#FF0000': 'red', '#00FF00': 'green', '#0000FF': 'blue' }

// Now you can find color names by color codes
function getColorName(code: string) {
  return codeToColor[code] || 'unknown';
}
console.log(getColorName('#FF0000')); // 'red'
```

#### Parameters

- `obj` (`Record<K, V>`): The object to swap keys and values. Both keys and values must be strings, numbers, or symbols.

#### Returns

(`Record<V, K>`): A new object with the keys and values of the original object swapped.
