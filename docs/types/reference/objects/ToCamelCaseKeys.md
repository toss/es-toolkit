# ToCamelCaseKeys

Converts all keys of an object type to camelCase recursively. This is the return type of [`toCamelCaseKeys`](../../../reference/object/toCamelCaseKeys.md).

```typescript
type Converted = ToCamelCaseKeys<T>;
```

## Usage

### `ToCamelCaseKeys<T>`

Use `ToCamelCaseKeys` when you need to name the type of data whose keys have been converted to camelCase — for example, the type of an API response after passing it through [`toCamelCaseKeys`](../../../reference/object/toCamelCaseKeys.md). Keys of nested objects and objects inside arrays are converted recursively. Built-in objects like `Date` or `Map` and primitive values pass through unchanged.

```typescript
import type { ToCamelCaseKeys } from 'es-toolkit/types';

type ApiUser = {
  user_id: number;
  first_name: string;
  user_address: { zip_code: string };
};

type User = ToCamelCaseKeys<ApiUser>;
// => { userId: number; firstName: string; userAddress: { zipCode: string } }
```

#### Type Parameters

- `T`: The type whose keys are converted.
