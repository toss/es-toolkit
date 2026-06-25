# partition

関数型パイプラインで使える data-last の `partition` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  partition(value => value % 2 === 0)
);
```

## 使い方

`partition` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { partition, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  partition(value => value % 2 === 0)
);
// [[2, 4], [1, 3]]
```

## API

### `partition(...)`

戻り値: A function that accepts the piped input.
