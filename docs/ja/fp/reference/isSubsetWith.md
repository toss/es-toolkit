# isSubsetWith

関数型パイプラインで使える data-last の `isSubsetWith` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
);
```

## 使い方

`isSubsetWith` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { isSubsetWith, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }],
  isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
);
// true
```

## API

### `isSubsetWith(...)`

戻り値: A function that accepts the piped input.
