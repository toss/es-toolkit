# DistributiveOmit

从联合类型的每个成员中移除指定的键，同时保留各成员的其余属性。

```typescript
type WithoutKeys = DistributiveOmit<T, K>;
```

## 用法

### `DistributiveOmit<T, K>`

当你需要从联合类型中移除属性，同时保留各成员特有的属性时，可以使用它。内置的 `Omit` 仅保留所有成员共有的键，而 `DistributiveOmit` 会分别对每个成员移除指定的键。

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

成员中不存在的键会被忽略。其余属性的 `readonly` 和可选修饰符保持不变。当 `T` 为 `never` 时返回 `never`；当 `K` 为 `never` 时不移除任何键。

#### 类型参数

- `T`: 要移除属性的类型。联合类型会按成员分别处理。
- `K`: 要移除的键。可以通过联合类型指定多个键，也可以指定仅存在于部分成员中的键。此参数没有约束，所有可赋值给 `K` 的键都会被移除。
