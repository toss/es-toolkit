# unzipWith

関数型パイプラインで使える data-last の `unzipWith` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  unzipWith((a, b) => a + b)
);
```

## 使い方

`unzipWith` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { pipe, unzipWith } from 'es-toolkit/fp';

const result = pipe(
  [
    [1, 10],
    [2, 20],
  ],
  unzipWith((a, b) => a + b)
);
// [3, 30]
```

## API

### `unzipWith(...)`

戻り値: A function that accepts the piped input.
