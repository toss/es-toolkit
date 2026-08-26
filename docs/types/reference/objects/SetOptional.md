# SetOptional

Makes the given keys of an object optional, leaving the rest unchanged. Like the built-in `Partial`, but scoped to specific keys.

```typescript
type Draft = SetOptional<T, K>;
```

## Usage

### `SetOptional<T, K>`

Use it when only part of an object may be missing, such as a draft that is still being filled in.

```typescript
import type { SetOptional } from 'es-toolkit/types';

interface Account {
  accountId: string;
  productCode: string;
  nickname: string;
}

// A nickname may not be filled in yet.
type AccountDraft = SetOptional<Account, 'nickname'>;
// => { accountId: string; productCode: string; nickname?: string }

const draft: AccountDraft = { accountId: 'a_1', productCode: 'SAVINGS' };

// Several keys at once.
type PartiallyFilled = SetOptional<Account, 'nickname' | 'productCode'>;
```

#### Type Parameters

- `T`: The object type to transform.
- `K`: The keys to make optional. Must be keys of `T`.
- It distributes over unions, so a union stays a union and each member keeps its own shape.
