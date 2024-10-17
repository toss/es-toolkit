# toFormData

Converts an object into a `FormData` instance, which is used in web forms to transmit key-value pairs. This function recursively processes each key-value pair in an object, appending them to the `FormData` instance. It supports nested objects, arrays, files, and various JavaScript data types, making it suitable for handling complex data structures.

- **Deep Conversion**: Recursively converts nested objects and arrays into `FormData` format.
- **Supports Files**: Automatically handles `File` and `Blob` objects.
- **Type Conversion**: Converts common JavaScript types like `boolean`, `BigInt`, `Date`, and more into their appropriate string representations for `FormData`.

## Signature

```typescript
function toFormData(data: any, formData?: FormData, parentKey?: string): FormData;
```

### Parameters

- `data` (`any`): The object to be converted into `FormData`. Supports primitives, arrays, objects, `File`, `Blob`, and other common data types.
- `formData` (`FormData`): An optional existing `FormData` instance to append the data to. If not provided, a new `FormData` instance is created.
- `parentKey` (`string`): An optional key to handle nested objects and arrays. Used internally during recursion.

### Returns

(`FormData`): A `FormData` instance populated with the object's key-value pairs.

### Data Type Support

This function handles various JavaScript data types:

- `undefined`: Skipped, no entry is created in `FormData`.
- `null`: Appends an empty string (`''`).
- `boolean`: Converted to `'true'` or `'false'`.
- `BigInt:` Converted to a `string`.
- `Date`: Converted to an ISO `string`.
- `File` / `Blob`: Appended as-is.
- `Array`: Recursively processed with index-based keys.
- `Object`: Recursively processed with nested keys.

## Examples

### Basic Usage

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData(obj);
// formData will contain:
// "name" -> "John"
// "age" -> "30"
// "preferences[color]" -> "blue"
// "preferences[food]" -> "pizza"
```

### Handling Files and Blobs

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file };
const formData = toFormData(obj);
// formData will contain:
// "name" -> "John"
// "profilePicture" -> file
```

### Handling BigInt and Complex Data Types

```typescript
const obj = { bigNumber: BigInt(12345678901234567890), createdAt: new Date() };
const formData = toFormData(obj);
// formData will contain:
// "bigNumber" -> "12345678901234567890"
// "createdAt" -> "2024-10-17T12:00:00.000Z"
```

### Nested Objects and Arrays

```typescript
const obj = {
  name: 'Alice',
  hobbies: ['reading', 'gaming'],
  address: {
    street: '123 Main St',
    city: 'Wonderland',
  },
};
const formData = toFormData(obj);
// formData will contain:
// "name" -> "Alice"
// "hobbies[0]" -> "reading"
// "hobbies[1]" -> "gaming"
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
