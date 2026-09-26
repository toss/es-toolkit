# ToPascalCaseKeys

Converts all keys of an object type to PascalCase recursively. This is the return type of [`toPascalCaseKeys`](../../../reference/object/toPascalCaseKeys.md).

```typescript
type Converted = ToPascalCaseKeys<T>;
```

## Usage

### `ToPascalCaseKeys<T>`

Use `ToPascalCaseKeys` when you need to name the type of data whose keys have been converted to PascalCase — for example, the type of a payload after passing it through [`toPascalCaseKeys`](../../../reference/object/toPascalCaseKeys.md). Keys of nested objects and objects inside arrays are converted recursively. Built-in objects like `Date` or `Map` and primitive values pass through unchanged.

```typescript
import type { ToPascalCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type PascalUser = ToPascalCaseKeys<User>;
// => { UserId: number; FirstName: string; UserAddress: { ZipCode: string } }
```

#### Type Parameters

- `T`: The type whose keys are converted.
