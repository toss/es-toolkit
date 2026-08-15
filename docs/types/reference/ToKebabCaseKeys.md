# ToKebabCaseKeys

Converts all keys of an object type to kebab-case recursively. This is the return type of [`toKebabCaseKeys`](../../reference/object/toKebabCaseKeys.md).

```typescript
type Converted = ToKebabCaseKeys<T>;
```

## Usage

### `ToKebabCaseKeys<T>`

Use `ToKebabCaseKeys` when you need to name the type of data whose keys have been converted to kebab-case — for example, the type of a payload after passing it through [`toKebabCaseKeys`](../../reference/object/toKebabCaseKeys.md). Keys of nested objects and objects inside arrays are converted recursively. Built-in objects like `Date` or `Map` and primitive values pass through unchanged.

```typescript
import type { ToKebabCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type KebabUser = ToKebabCaseKeys<User>;
// => { 'user-id': number; 'first-name': string; 'user-address': { 'zip-code': string } }
```

#### Type Parameters

- `T`: The type whose keys are converted.
