# zipWith

関数型パイプラインで使える data-last の `zipWith` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  zipWith([10, 20], (a, b) => a + b)
);
```

## 使い方

`zipWith` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { pipe, zipWith } from 'es-toolkit/fp';

const result = pipe(
  [1, 2],
  zipWith([10, 20], (a, b) => a + b)
);
// [11, 22]
```

## API

### `zipWith(...)`

戻り値: A function that accepts the piped input.
