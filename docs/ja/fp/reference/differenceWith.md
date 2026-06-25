# differenceWith

関数型パイプラインで使える data-last の `differenceWith` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  differenceWith([2], (item, id) => item.id === id)
);
```

## 使い方

`differenceWith` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { differenceWith, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  differenceWith([2], (item, id) => item.id === id)
);
// [{ id: 1 }]
```

## API

### `differenceWith(...)`

戻り値: A function that accepts the piped input.
