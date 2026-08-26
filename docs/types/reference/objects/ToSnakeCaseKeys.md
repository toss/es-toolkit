# ToSnakeCaseKeys

Converts all keys of an object type to snake_case recursively. This is the return type of [`toSnakeCaseKeys`](../../../reference/object/toSnakeCaseKeys.md).

```typescript
type Converted = ToSnakeCaseKeys<T>;
```

## Usage

### `ToSnakeCaseKeys<T>`

Use `ToSnakeCaseKeys` when you need to name the type of data whose keys have been converted to snake_case — for example, the type of a request body after passing it through [`toSnakeCaseKeys`](../../../reference/object/toSnakeCaseKeys.md). Keys of nested objects and objects inside arrays are converted recursively. Built-in objects like `Date` or `Map` and primitive values pass through unchanged.

```typescript
import type { ToSnakeCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ApiUser = ToSnakeCaseKeys<User>;
// => { user_id: number; first_name: string; user_address: { zip_code: string } }
```

#### Type Parameters

- `T`: The type whose keys are converted.
