# DistributiveOmit

ユニオンの各メンバーから指定したキーを削除し、残りのプロパティを保持します。

```typescript
type WithoutKeys = DistributiveOmit<T, K>;
```

## 使用法

### `DistributiveOmit<T, K>`

各メンバー固有のプロパティを失わずに、ユニオンからプロパティを削除したいときに使います。組み込みの `Omit` はすべてのメンバーに共通するキーだけを保持しますが、`DistributiveOmit` は各メンバーから個別にキーを削除します。

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

メンバーに存在しないキーは無視されます。残りのプロパティの `readonly` と省略可能の修飾子は保持されます。`T` が `never` の場合は `never` を返し、`K` が `never` の場合はキーを削除しません。

#### 型パラメータ

- `T`: プロパティを削除する型。ユニオンはメンバーごとに処理されます。
- `K`: 削除するキー。複数のキーをユニオンで指定でき、一部のメンバーにのみ存在するキーも指定できます。組み込みの `Omit` と同様に、`PropertyKey`（`string | number | symbol`）に代入可能な型である必要があります。
