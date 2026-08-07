# toFormData

Converts an object into a `FormData` instance, allowing customization through a configuration object. This function recursively processes each key-value pair in an object, appending them to the `FormData` instance. It supports nested objects, arrays, files, and various JavaScript data types, making it suitable for handling complex data structures. Configuration options control how different data types and structures are represented in the `FormData`.

- **Deep Conversion**: Recursively converts nested objects and arrays into `FormData` format.
- **Supports Files**: Automatically handles `File` and `Blob` objects.
- **Type Conversion**: Converts common JavaScript types like `boolean`, `BigInt`, `Date`, and more into their appropriate string representations for `FormData`.
- **Configurable Behavior**: Provides options to customize how arrays, booleans, null values, and nested objects are handled.

## Signature

```typescript
function toFormData({
  data: Record<string, any>,
  formData = new FormData(),
  parentKey?: string,
  config = formDataOptions
}): FormData;
```

### Parameters

- `data` (`Record<string, any>`): The object to be converted into `FormData`. Supports primitives, arrays, objects, `File`, `Blob`, and other common data types.
- `formData` (`FormData`): An optional existing `FormData` instance to append the data to. If not provided, a new `FormData` instance is created.
- `parentKey` (`string`): An optional key to handle nested objects and arrays. Used internally during recursion.
- `config` (`object`): Configuration object with options to customize the `FormData` conversion.

### Configuration Options

- `allowEmptyArrays` (`boolean`): When `true`, empty arrays are added to the `FormData` as empty strings. Default is `false`.
- `convertBooleansToIntegers` (`boolean`): When `true`, boolean values (`true`/`false`) are converted to `'1'` and `'0'`. Default is `false`.
- `ignoreNullValues` (`boolean`): When `true`, `null` values are omitted from the `FormData`. Default is `false`.
- `noArrayNotationForFiles` (`boolean`): When `true`, file arrays are added to `FormData` without the `[]` notation. Default is `false`.
- `noArrayNotationForNonFiles` (`boolean`): When `true`, non-file arrays are added to `FormData` without the `[]` notation. Default is `false`.
- `useDotNotationForObjects` (`boolean`): When `true`, nested object properties use dot notation (e.g., `parent.child`) instead of bracket notation (e.g., `parent[child]`). Default is `false`.

### Returns

(`FormData`): A `FormData` instance populated with the object's key-value pairs.

### Data Type Support

This function handles various JavaScript data types:

- `undefined`: Skipped, no entry is created in `FormData`.
- `null`: Appends an empty string (`''`) or is ignored based on `ignoreNullValues`.
- `boolean`: Converted to `'true'` or `'false'` or to `'1'`/`'0'` if `convertBooleansToIntegers` is `true`.
- `BigInt`: Converted to a `string`.
- `Date`: Converted to an ISO `string`.
- `File` / `Blob`: Appended as-is.
- `Array`: Recursively processed, with or without `[]` notation based on configuration.
- `Object`: Recursively processed with dot or bracket notation based on configuration.

## Examples

### Basic Usage with Configuration

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData({ data: obj, config: { useDotNotationForObjects: true } });
// formData will contain:
// "name" -> "John"
// "age" -> "30"
// "preferences.color" -> "blue"
// "preferences.food" -> "pizza"
```

### Handling Files and Empty Arrays

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file, tags: [] };
const formData = toFormData({ data: obj, config: { allowEmptyArrays: true } });
// formData will contain:
// "name" -> "John"
// "profilePicture" -> file
// "tags" -> ""
```

### Converting Booleans and Ignoring Null Values

```typescript
const obj = { isActive: true, age: null };
const formData = toFormData({ data: obj, config: { convertBooleansToIntegers: true, ignoreNullValues: true } });
// formData will contain:
// "isActive" -> "1"
// (No "age" entry, as null values are ignored)
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
const formData = toFormData({ data: obj, config: { noArrayNotationForNonFiles: true } });
// formData will contain:
// "name" -> "Alice"
// "hobbies" -> ["reading", "gaming"] // No array notation for non-files
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
