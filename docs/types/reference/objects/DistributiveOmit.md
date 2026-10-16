# DistributiveOmit

Removes the given keys from each member of a union while preserving each member's remaining properties.

```typescript
type WithoutKeys = DistributiveOmit<T, K>;
```

## Usage

### `DistributiveOmit<T, K>`

Use it to remove properties from a union without losing the properties specific to each member. The built-in `Omit` only keeps keys shared by all members, whereas `DistributiveOmit` applies the omission to each member separately.

```typescript
import type { DistributiveOmit } from 'es-toolkit/types';

type Card = { kind: 'card'; cardNo: string; note: string };
type Bank = { kind: 'bank'; accountNo: string; note: string };

type Payment = DistributiveOmit<Card | Bank, 'note'>;
// => { kind: 'card'; cardNo: string } | { kind: 'bank'; accountNo: string }

type BuiltInPayment = Omit<Card | Bank, 'note'>;
// => { kind: 'card' | 'bank' }

type WithoutCardNo = DistributiveOmit<Card | Bank, 'note' | 'cardNo'>;
// => { kind: 'card' } | { kind: 'bank'; accountNo: string }
```

Keys absent from a member are ignored. Remaining properties keep their `readonly` and optional modifiers. Passing `never` for `T` returns `never`; passing `never` for `K` removes no keys.

#### Type Parameters

- `T`: The type to remove properties from. Unions are processed member by member.
- `K`: The keys to remove. Multiple keys can be specified as a union, including keys that exist in only some members. This parameter is unconstrained; each key assignable to `K` is removed.
