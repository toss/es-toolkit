# xorBy

関数型パイプラインで使える data-last の `xorBy` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
);
```

## 使い方

`xorBy` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { pipe, xorBy } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
);
// [{ id: 1 }, { id: 3 }]
```

## API

### `xorBy(...)`

戻り値: A function that accepts the piped input.
