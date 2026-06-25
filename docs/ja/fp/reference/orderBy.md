# orderBy

関数型パイプラインで使える data-last の `orderBy` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, orderBy(['age'], ['asc']));
```

## 使い方

`orderBy` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { orderBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [
    { name: 'a', age: 2 },
    { name: 'b', age: 1 },
  ],
  orderBy(['age'], ['asc'])
);
// [{ name: 'b', age: 1 }, { name: 'a', age: 2 }]
```

## API

### `orderBy(...)`

戻り値: A function that accepts the piped input.
