# union (Lodash互換)

::: warning `es-toolkit`の[union](../../array/union.md)を使用してください

この`union`関数は複雑な配列処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[union](../../array/union.md)を使用してください。

:::

複数の配列からユニークな値のみを集めて新しい配列を作成します。

```typescript
const result = union(...arrays);
```

## 参照

### `union(...arrays)`

複数の配列をマージして重複を削除し、ユニークな値のみを含む新しい配列を作成したい場合は`union`を使用してください。各値が最初に出現する順序を保持します。

```typescript
import { union } from 'es-toolkit/compat';

// 数値配列をマージ
union([2], [1, 2]);
// 戻り値: [2, 1]

// 複数の配列をマージ
union([2], [1, 2], [2, 3]);
// 戻り値: [2, 1, 3]

// ネストした配列は平坦化されません
union([1, 3, 2], [1, [5]], [2, [4]]);
// 戻り値: [1, 3, 2, [5], [4]]

// 配列でない値は無視されます
union([0], 3, { '0': 1 }, null, [2, 1]);
// 戻り値: [0, 2, 1]

// 配列のようなオブジェクトも処理されます
union([0], { 0: 'a', length: 1 }, [2, 1]);
// 戻り値: [0, 'a', 2, 1]
```

`null`または`undefined`は無視されます。

```typescript
import { union } from 'es-toolkit/compat';

union([1, 2], null, undefined, [3, 4]);
// 戻り値: [1, 2, 3, 4]
```

#### パラメータ

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): マージする配列。配列でない値は無視されます。

#### 戻り値

(`T[]`): すべての配列のユニークな値を含む新しい配列を返します。
