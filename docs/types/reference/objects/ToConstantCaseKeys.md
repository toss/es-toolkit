# ToConstantCaseKeys

Converts all keys of an object type to CONSTANT_CASE recursively. This is the return type of [`toConstantCaseKeys`](../../../reference/object/toConstantCaseKeys.md).

```typescript
type Converted = ToConstantCaseKeys<T>;
```

## Usage

### `ToConstantCaseKeys<T>`

Use `ToConstantCaseKeys` when you need to name the type of data whose keys have been converted to CONSTANT_CASE — for example, the type of a payload after passing it through [`toConstantCaseKeys`](../../../reference/object/toConstantCaseKeys.md). Keys of nested objects and objects inside arrays are converted recursively. Built-in objects like `Date` or `Map` and primitive values pass through unchanged.

```typescript
import type { ToConstantCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ConstantUser = ToConstantCaseKeys<User>;
// => { USER_ID: number; FIRST_NAME: string; USER_ADDRESS: { ZIP_CODE: string } }
```

#### Type Parameters

- `T`: The type whose keys are converted.
