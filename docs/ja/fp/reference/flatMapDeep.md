# flatMapDeep

関数型パイプラインで使える data-last の `flatMapDeep` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  flatMapDeep(value => [[value, value]])
);
```

## 使い方

`flatMapDeep` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { flatMapDeep, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2],
  flatMapDeep(value => [[value, value]])
);
// [1, 1, 2, 2]
```

## API

### `flatMapDeep(...)`

戻り値: A function that accepts the piped input.
